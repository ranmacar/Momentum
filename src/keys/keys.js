import $ from '../reactive/trkl';
import overlay from './key-overlay'

/* features:
bind functions to key tap, double tap, hold
taps and holds can switch modes 
*/

export default ({
    tap = 200,
    sticky = 2000,
    display = true,
    history = true,
} = {}) => {
    const held = $([])     // all keys being held 
    const last = $()       // last key that has been tapped
    const events = $([])   // optional history of key events

    const eventProxy = (mappings) => new Proxy(mappings, {
        get(target, code) {
            const currentMode = mode()
            if (code === 'fallback') return target.fallback
            if (code === 'default') return target.default
            if (target[code]) return target[code]
            if (target.fallback && modes?.[fallback]?.[code]) return modes[fallback][code]
            return target.default?.(code, currentMode)
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
        }, {
            name: 'default',
            fallback: 0,

        }
    ]).map(eventProxy)
    const mode = $(modes[0])

    const codeMatch = (released) => (held) => held.code === released.code

    const down = (e) => {
        const event = held().find(codeMatch(e))
        const mappings = mode()?.[e.code]

        if (mappings?.ignore) return

        if (event) {
            const duration = e.timeStamp - event.timeStamp;
            mappings?.held?.(event, duration, true)
        } else {
            held([...held(), e])

            if (history) {
                e.TYPE = 'held'
                events([e, ...events()])
            }
        }

        e.preventDefault()
    }

    const deffer = (event, mappings) => {
        event.tap = mappings.tap.bind(event)
        event.deferred = setTimeout(undeffer, tap)

        last(event)
    }

    const undeffer = () => {
        const event = last()

        if (!event) return

        clearTimeout(event.deferred)
        event.tap()

        if (history) {
            event.TYPE = 'tap'
            events([...events()])
        }
    }

    const up = (e) => {
        const temp = held()
        const index = temp.findIndex(codeMatch(e))
        const [event] = temp.splice(index, 1)

        if (!event) return

        held(temp)

        const mappings = mode()?.[event.code]
        const duration = e.timeStamp - event.timeStamp

        if (mappings) {
            if (duration < tap) {
                const before = last()
                if (mappings.double) {
                    if (before) {
                        if (before.code === event.code && event.timeStamp - before.timeStamp < tap) { // and its the same
                            last(false)
                            mappings?.double?.(before)

                            if (history) {
                                before.TYPE = 'double'
                                events([...events().slice(1)])
                            }
                        } else {
                            undeffer()
                            deffer(event, mappings)
                        }
                    } else {
                        deffer(event, mappings)
                    }
                } else {
                    undeffer()

                    mappings?.tap?.(event)

                    if (history) {
                        event.TYPE = 'tap'
                        events([event, ...events()])
                    }
                }
            } else {
                mappings?.held?.(event, duration)

                if (history) {
                    e.TYPE = 'released'
                    e.duration = duration
                    events([e, ...events()])
                }
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