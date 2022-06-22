import { JS_to_HTML } from './js-html'
import overlay from './key-overlay'
import { layout } from './key-layout'

document.body.append(JS_to_HTML(...overlay(layout)))

export default ({
    tap = 100,
    hold = 300,
    repeat = 500,
    double = 200,
    layers = [{
        name: 'default',
        fallthrough: false,
        keys: []
    }]
} = {}) => {
    /*
        features:
            bind functions to keys
                tap, double tap, hold
                chords?
            regexp matchers
    */

    let activeLayout = 0;

    const held = []         // all keys being held 
    const tapped = []       // keys that have been tapped recently
    const processed = []    // keys that have been processed already a shoudlnt retriger on up 

    const parse = (shortcut) => {
        const taps = shortcut.split(' ')
        const keys = taps.map(tap => tap.split('+'))
    }

    const mappings = layers

    const layout = (index) => activeLayout = index
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const macro = async (...events) => events.reduce(dispatcher)

    const dispatcher = (_, event) => dispatch(event)
    const dispatch = (event) => event.target.dispatchEvent(new event.class(event.type, event))
    const codeMatch = (released) => (held) => held.code === released.code

    const down = (e) => {
        const event = held.find(codeMatch(e))
        if (event) {
            const duration = e.timeStamp - event.timeStamp;
            mappings[e.key]?.held()
        } else {
            held.push(e)
            document.querySelector('#' + e.code).style.background = 'green'
        }

        e.preventDefault()
    }

    const up = (e) => {
        const index = held.findIndex(codeMatch(e))
        const [event] = held.splice(index, 1)

        document.querySelector('#' + e.code).style.background = ''

        const duration = e.timeStamp - event.timeStamp

        if (duration < tap) tapped.push(event)

        console.log(held.map(e => e.code).concat(e.code).join('+'))

        mappings[e.key]?.pressed()
    }

    const reset = () => {
        held.length = 0
        tapped.length = 0
        processed.length = 0
    }

    document.onkeydown = down
    document.onkeyup = up
    window.onblur = reset


    return mappings
}