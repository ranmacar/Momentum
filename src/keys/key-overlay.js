import $ from '../reactive/trkl'
import { JS_to_HTML as h } from '../ast/js-html'
import layouts from './key-layouts'

const falsy = thing => !!thing

export default (modes, mode, held, history) => {
    const layout = $(localStorage.getItem('keys__layout') || Object.values(layouts)[0])

    const rows = $.computed(() => layout().split('\n').filter(falsy)
        .map((row) => row.split(' ').map((keyString) => {
            const [span, key] = keyString.match(/^-?(\d+\.?\d*)?([^-:]+)/)?.slice(1) || [1, k, k]

            return {
                key: key === 'none' ? '' : key,
                span: span || 1,
                merge: keyString.startsWith('-')
            }
        }).reduce(
            (row, key) => key.merge
                ? row.slice(0, -1).concat([row.slice(-1).flat().concat(key)])
                : row.concat([[key]])
            , []
        ))
    )

    const keys = $.computed(() => rows().flat(2).map(button => button.key).filter(falsy))

    console.log(keys())

    const buttonStyle = key => `
        font-weight: 700;
        font-size: 1.2rem;
        margin: 3px;
        min-width: 0;
        text-align: center;
        display: flex;
        flex: 1 1;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0 0 5px 3px gray;
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
        ...rows().map((row) => [
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
                            flex-direction: column;
                        `
                    }, ...key.map(key => [
                        'div',
                        {
                            style: `
                                flex: 1 1;
                                min-width: 0;
                                min-height: 0;
                                display: flex;
                            `
                        },
                        ['div', {
                            id: key.key,
                            style: buttonStyle(key)
                        }, key.display || key.key]
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
        const fallback = modes[current.fallback]
        const handler = current[key] || fallback?.[key]

        const display = handler?.display
            || current?.default?.(key, current)?.display
            || fallback?.default?.(key, current)?.display

        document.querySelector('#' + key).innerHTML = display
            ? Array.isArray(display)
                ? h(...display).innerHTML
                : display
            : ''
    }))

    const highlightHeld = $.computed((old = []) => {
        old.map(code => document.querySelector('#' + code).style.background = '')
        return held().map(e => {
            document.querySelector('#' + e.code).style.background = 'green'
            return e.code
        })
    })

    if (history) {
        document.body.append(h(...['div', {
            id: 'history'
        }]))

        $.computed(() => document.querySelector('#history').innerHTML = h(...[
            'div',
            ...history().map(e => [
                'div',
                [e.TYPE, e.code, e.duration || ''].join(' ')
            ])]).innerHTML)
    }
}