import $ from '../reactive/trkl';
import overlay from './key-overlay'

export default ({
    tap = 200,
    sticky = 2000,
    bindings = [],
    stack = [0],
    display = true,
    history = true,
} = {}) => {
    const held = $([])     // all keys being held 
    const events = $([])   // optional history of key events

    const eventProxy = (bindings) => new Proxy(bindings, {
        get(target, code) {
            if (target[code]) return target[code]
            const deflt = target.default?.(code, target)
            if (deflt) return deflt

            const fallback = modes[target.fallback]
            if (fallback && fallback?.[code]) return fallback[code]
            return fallback?.default?.(code, target) || {}
        }
    })

    const modes = (JSON.parse(localStorage.getItem('keys__modes')) || [
        {
            name: 'debug',
            default(code, mode) {
                return {
                    display: ['div', code],
                    tap: (e) => console.log('tap', code, mode.name),
                    double: (e) => console.log('double', code, mode.name),
                    held: (e, duration, released) => console.log('held', code, mode.name, duration, !!released),
                }
            },
        },
        ...bindings
    ]).map(eventProxy)

    const codeMatch = (code) => (held) => held.code === code

    const modeStack = $(stack)

    const setMode = mode => modeStack([modes[mode], ...modeStack()])

    const clearMode = mode => mode
        ? modeStack(modeStack().filter(m => mode !== m))
        : modeStack(modeStack().slice(1))

    const selectMode = (stack, held) => {
        const mode = modes[stack[0]]

        if (mode.toggle) {
            const toggles = Object.entries(mode.toggle)

            for (const [key, index] of toggles) {
                const event = held.find(codeMatch(key))
                if (event) {
                    stack.unshift(index)
                    event.toggle = stack[0]
                }
            }
        }

        return modes[stack[0]]
    }

    const mode = $.computed(() => {
        const selected = selectMode(modeStack(), held())
        // console.debug(selected, modeStack())
        return selected
    })


    const down = (e) => {
        const event = held().find(codeMatch(e.code))
        const mappings = mode()?.[e.code]

        if (event) {
            const duration = e.timeStamp - event.timeStamp;
            mappings?.held?.(event, duration, true)
        } else {
            e.mappings = mappings
            held([...held(), e])

            if (history) {
                e.TYPE = 'held'
                events([e, ...events()])
            }
        }

        e.preventDefault()
    }

    let last = false
    const deffer = (event) => {
        event.deferred = setTimeout(undeffer, tap)
        last = event
    }

    const undeffer = () => {
        if (!last || !last.deferred) return

        clearTimeout(last.deferred)
        last.mappings.tap(last)

        if (history) {
            last.TYPE = 'tap'
            events([...events()])
        }

        last = false
    }

    const up = (e) => {
        const temp = held()
        const index = temp.findIndex(codeMatch(e.code))
        const [event] = temp.splice(index, 1)

        if (!event) return

        if (event.toggle !== undefined) {
            clearMode(event.toggle)
        }

        held(temp)

        const duration = e.timeStamp - event.timeStamp

        if (duration < tap) {
            if (event.mappings.double) {
                if (last) {
                    if (last.code === event.code && event.timeStamp - last.timeStamp < tap) { // and its the same
                        last.mappings?.double?.(last)

                        if (history) {
                            last.TYPE = 'double'
                            events([...events().slice(1)])
                        }

                        last = false
                    } else {
                        undeffer()
                        deffer(event)
                    }
                } else {
                    deffer(event)
                }
            } else {
                undeffer()

                event.mappings?.tap?.(event)

                if (history) {
                    event.TYPE = 'tap'
                    events([...events()])
                }
            }
        } else {
            event.mappings?.held?.(event, duration)

            if (history) {
                e.TYPE = 'released'
                e.duration = duration
                events([e, ...events()])
            }
        }
    }

    const reset = () => {
        held([])
        last = false
    }

    document.onkeydown = down
    document.onkeyup = up
    window.onblur = reset

    if (display) return overlay(modes, mode, held, history && events)
}