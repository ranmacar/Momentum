import $ from '../reactive/trkl';
import overlay from './key-overlay'
import { standard, shifted } from './key-bindings';

/* features:
bind functions to key tap, double tap, hold
taps and holds can switch modes 
*/

export default ({
    tap = 200,
    sticky = 2000,
    modes = [],
    display = true,
    history = true,
} = {}) => {
    const held = $([])     // all keys being held 
    const last = $()       // last key that has been tapped
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

    modes = (JSON.parse(localStorage.getItem('keys__modes')) || [
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
        standard,
        shifted
    ]).map(eventProxy)

    const codeMatch = (code) => (held) => held.code === code

    const modeStack = $([1, 0])

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

    const deffer = (event) => {
        event.deferred = setTimeout(undeffer, tap)
        last(event)
    }

    const undeffer = () => {
        const event = last()
        if (!event || !event.deferred) return

        clearTimeout(event.deferred)
        event.mappings.tap(event)

        if (history) {
            event.TYPE = 'tap'
            events([...events()])
        }

        last(false)
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

        // const mappings = mode()?.[event.code] || {}
        const duration = e.timeStamp - event.timeStamp

        if (duration < tap) {
            const before = last()
            if (event.mappings.double) {
                if (before) {
                    if (before.code === event.code && event.timeStamp - before.timeStamp < tap) { // and its the same
                        before.mappings?.double?.(before)
                        last(false)

                        if (history) {
                            before.TYPE = 'double'
                            events([...events().slice(1)])
                        }
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
        last([false])
    }

    if (display) overlay(modes, mode, held, history && events)

    document.onkeydown = down
    document.onkeyup = up
    window.onblur = reset
}