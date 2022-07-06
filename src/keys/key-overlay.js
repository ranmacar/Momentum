import $ from '../reactive/trkl'
import { JS_to_HTML as h } from '../ast/js-html'
import layouts from './key-layouts'

const falsy = thing => !!thing

export default (modes, mode, held, history) => {
    const layout = $(localStorage.getItem('keys__layout') || Object.values(layouts)[0])
    const keys = $.computed(() => layout().split(/\s/).filter(x => !!x).map(key => key.replace(/^\d+\.?\d*|-/, '')))

    const rows = layout().split('\n').filter(falsy)
    const buttons = rows.map((r, row) => r.split(' ').map((k, column) => {
        const [span, key] = k.match(/^(\d+\.?\d*)(.*)/)?.slice(1) || [1, k]

        return { key: key === 'none' ? '' : key, row, column, span }
    }))

    const merged = buttons.flat().filter(key => key.key.startsWith('-'))

    merged.forEach(key => {
        const prev = buttons[key.row][key.column - 1]
        buttons[key.row][key.column - 1] = [prev, { ...key, key: key.key === '-none' ? '' : key.key.slice(1) }]
        buttons[key.row][key.column] = false
    })

    const filtered = buttons.map(row => row.filter(falsy))

    const buttonStyle = key => `
        margin: 3px;
        min-width: 0;
        text-align: center;
        display: flex;
        flex: 1 1;
        justify-content: center;
        align-items: center;
    ${key.key ? 'border: 2px solid gray' : ''};
    `

    document.body.append(h(...[
        'div', {
            class: 'keyboard',
            style: `
                display: flex;
                width: 100%;
                flex-direction: column;
                `
        },
        ...modes.map((mode) => {

        }),
        ...filtered.map((row) => [
            'div', {
                class: 'row',
                style: `
                display: flex;
                `
            }, ...row.map(key => Array.isArray(key)
                ? [
                    'div', {
                        style: `
                    display: flex;
                    height: 4rem;
                        min-width: 0;
                        flex: ${key[0].span} ${key[0].span};
                        flex-direction: column;`
                    }, ...key.map(key => [
                        'div',
                        {
                            style: `
                            flex: 1 1;
                            min-width: 0;
                            display: flex;
                            `
                        },
                        ['div', {
                            id: key.key,
                            style: buttonStyle(key)
                        }, key.key]
                    ])
                ]
                : [
                    'div',
                    {
                        style: `
                        height: 4rem;
                        display: flex;
                        min-width: 0;
                        flex: ${key.span} ${key.span};
                        `
                    },
                    ['div', {
                        id: key.key,
                        style: buttonStyle(key)
                    }, key.key]
                ])
        ])
    ]))

    const updateKeys = $.computed(() => keys().map(key => {
        const current = mode()
        const handler = current[key] || modes[current.fallback]?.[key]
        const display = handler.display
        document.querySelector('#' + key).innerHTML = display ? h(...display).innerHTML : ''
    }))

    const highlightHeld = $.computed((old = []) => {
        old.map(code => document.querySelector('#' + code).style.background = '')
        return held().map(e => {
            document.querySelector('#' + e.code).style.background = 'green'
            return e.code
        })
    })

    if (history) {
        document.body.append(h(...['pre', {
            id: 'history'
        }]))

        $.computed(() => document.querySelector('#history').innerHTML = history().map(
            (e, i) => [i + 1, e.TYPE, e.code, e.duration || ''
            ].join(' '),
        ).join('\n'))
    }
}