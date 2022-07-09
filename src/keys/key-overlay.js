import $ from '../reactive/trkl'
import { JS_to_HTML as h } from '../ast/js-html'
import layouts from './key-layouts'

const falsy = thing => !!thing

const jss = (selector, style) => Array.from(document.querySelectorAll(selector))
    .map(element => Object.assign(element.style, style))

export default (modes, mode, held, history) => {
    const layout = $(localStorage.getItem('keys__layout') || layouts.yoga530)

    const rows = $.computed(() => layout().split('\n').filter(falsy)
        .map((row) => row.trim().split(' ').map((keyString) => {
            const [span, key] = keyString.match(/^-?(\d+\.?\d*)?([^-:]+)/)?.slice(1) || [1, keyString]

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
        transition: all 0.3s;
        ${key.key ? `
            background: #eeeeee;
            box-shadow: 2px 2px 5px 3px gray;
            border: 2px solid gray
        ` : ''};
    `

    document.body.append(h([
        'div.keyboard', {
            style: `
                display: flex;
                width: 100%;
                flex-direction: column;
            `
        },
        ['div.modes', {
            style: `
                display: flex;
                flex: 0 0 2rem;
                width: 100%;
            `
        },
            ...modes.map((m) => ['div#_' + m.name, {
                style: `
                    background: #eeeeee;
                    min-width: 6rem;
                    flex: 1;
                    text-align: center;
                    border: 1px solid gray;
                    margin: 4px;
                `
            }, m.name])],
        ['div', {
            style: `
                aspect-ratio: 2.7;
                display: flex;
                flex-direction: column;
            `
        },
            ...rows().map((row) => [
                'div.row', {
                    style: `
                        display: flex;
                        flex: 1 0;
                        min-height: 0;
                    `
                }, ...row.map(key => Array.isArray(key)
                    ? [
                        'div', {
                            style: `
                            display: flex;
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
        ]]))

    const updateKeys = $.computed(() => keys().map(key => {
        const current = mode()
        const fallback = modes[current.fallback]
        const handler = current[key] || fallback?.[key]

        const display = handler?.display
            || current?.default?.(key, current)?.display
            || fallback?.default?.(key, current)?.display

        document.querySelector('#' + key).innerHTML = display
            ? Array.isArray(display)
                ? h(display).innerHTML
                : display
            : ''
    }))


    const highlightHeld = $.computed((old = []) => {
        old.map(code => jss('#' + code, {
            boxShadow: '2px 2px 5px 3px gray',
            background: '#eeeeee',
            transform: 'scale(1)'
        }))

        return held().map(e => {
            jss('#' + e.code, {
                boxShadow: '1px 1px 3px 1px gray',
                background: '#ddffdd',
                transform: 'scale(0.9)'
            })
            return e.code
        })
    })

    const showMode = $.computed((old) => {
        jss('#_' + old, {
            borderColor: 'gray',
            background: '#eeeeee'
        })

        jss('#_' + mode().name, {
            borderColor: 'black',
            background: '#ffdddd'
        })

        return mode().name
    })

    if (history) {
        document.body.append(h(['div#history']))
        $.computed(() => {
            const last = history()[0]
            if (last) document.querySelector('#history').prepend(h(['div', [last.TYPE, last.code, last.duration || ''].join(' ')]))
        })
    }
}