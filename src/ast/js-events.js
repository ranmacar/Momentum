export default (eventPrefix = "on:", proxy = true, error = console.error) => {
    const knownEvents = {}

    function nativeToSyntheticEvent(event, name) {
        event.caller = event.target
        while (event.caller) {
            if (event.caller[eventPrefix + name]?.map?.(
                eventHandler => {
                    try {
                        return eventHandler(event)
                    } catch (e) {
                        error(e, name, event, event.caller)
                    }
                }).some(x => !!x)) return
            event.caller = event.caller.parentNode
        }
    }

    function setupEvent(name) {
        if (knownEvents[name]) return
        document.addEventListener(name, event => nativeToSyntheticEvent(event, name))
        knownEvents[name] = true
    }

    function svgCoords(svg, x, y, element) {
        // TODO: Check DOMPoint
        var pt = svg.createSVGPoint()
        pt.x = x
        pt.y = y
        var coords = pt.matrixTransform((element || svg).getScreenCTM().inverse())
        return [coords.x, 1 - coords.y]
    }

    function svgParent(element) {
        while (element && element.nodeName !== 'svg') {
            element = element.parent
        }
        return element
    }

    const addArgs = (fn, args, svg) => {
        const handler = (e) => fn(svg ? Object.assign(e, {
            svgCoords: svgCoords(svg, e.clientX, e.clientY, e.caller)
        })
            : e,
            state(e.caller), ...args)

        handler.__name = fn.name
        return handler
    }

    function on(event, fn, ...args) {
        if (event === 'focus') event = 'focusin';
        if (event === 'blur') event = 'focusout';

        const name = eventPrefix + event

        setupEvent(event);

        return element => {
            element[name] = [...(element[name] || []), addArgs(fn, args, svgParent(element))]
            return {
                [name]: element[name].map(fn => fn.__name || 'anonymous').join(' | ')
            }
        }
    }

    function off(event, fn) {
        const name = eventPrefix + event
        return element => {
            element[name] = element[name]?.filter?.(handler => !!fn && fn !== handler)
            if (!element[name].length) {
                delete element[name]
                element.removeAttribute(name)
            } else return {
                [name]: element[name].map(fn => fn.name).join(' | ')
            }
        }
    }

    function dispatch(name, el, ...args) {
        (el || document.body)
            .dispatchEvent(new CustomEvent(name, {
                bubbles: true,
                detail: args
            }))
    }


    function state(el) {
        let state = el.state || null
        let parent = el;

        while (!state && parent) {
            parent = parent.parent
            state = parent?.state || null
        }

        el.state = el.state || Object.create(state)

        return el.state
    }

    if (proxy) return {
        on: new Proxy(knownEvents, {
            get(target, prop) {
                return (fn, ...args) => on(prop, fn, ...args)
            }
        }),
        off: new Proxy(knownEvents, {
            get(target, prop) {
                return (fn) => off(prop, fn)
            }
        }),
        dispatch: new Proxy(knownEvents, {
            get(target, prop) {
                return (...args) => dispatch(prop, ...args)
            }
        }),
        state
    }

    else return {
        on,
        off,
        dispatch,
        state
    };
}