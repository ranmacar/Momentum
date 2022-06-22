import { JS_to_HTML } from './js-html'
import overlay from './key-overlay'

import { layout } from './key-layout'
// import { persistFile } from '../persist-plugin'

// const keyFile = `
// const layout = \`${[0, 1, 2, 3, 4, 5].map(row => layout.filter((key) => key.row === row).map((key) => key.code).join(' ')).join('\n')}\`

// export default ${JSON.stringify(layout.map(
//     (o, index) => ({
//         row: Math.floor(index / (78 / 6)), column: index,
//         ...o
//     })
// ), 0, 4)}
// `

// persistFile(['src', 'key-layout.js'], keyFile)
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
    const codeMatch = (released) => (held) => held.keyCode === released.keyCode

    const down = (e) => {
        const event = held.find(codeMatch(e))
        if (event) {
            const duration = e.timeStamp - event.timeStamp;
            mappings[e.key]?.held()
        } else {
            held.push(e)
        }
        e.preventDefault()
    }

    const up = (e) => {
        const index = held.findIndex(codeMatch(e))
        const [event] = held.splice(index, 1)

        const duration = e.timeStamp - event.timeStamp

        if (duration < tap) tapped.push(event)

        console.log(held.map(e => e.key).concat(e.key).join('+'))

        mappings[e.key]?.pressed()

        console.log(e)
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