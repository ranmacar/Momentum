import $ from '../reactive/trkl'
import { JS_to_HTML as h } from '../ast/js-html'
import events from '../ast/js-events'
import { style } from '../ast/js-css'

import layouts from './key-layouts'

const falsy = thing => !!thing

const { on, state, dispatch } = events()

const effect = (fn) => (el) => {
    $.computed((old) => fn(el, old))
}

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

    const buttonStyle = key => Object.assign({
        fontWeight: 700,
        fontSize: '1.2rem',
        margin: '3px',
        minWidth: 0,
        textAlign: 'center',
        display: 'flex',
        flex: '1 1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        transition: 'all 0.3s',
    }, key.key ? {
        background: '#eeeeee',
        boxShadow: '2px 2px 5px 3px gray',
        border: '2px solid gray'
    } : {})

    const Modes = [
        'div.modes',
        style({
            display: 'flex',
            flex: '0 0 2rem',
            width: '100%'
        }),
        ...modes.map((m) => [
            'div#_' + m.name,
            style({
                background: '#eeeeee',
                minWidth: '6rem',
                flex: 1,
                textAlign: 'center',
                border: '1px solid gray',
                margin: '4px'
            }),
            m.name
        ]),

        effect((el, old) => {
            style({
                borderColor: 'gray',
                background: '#eeeeee'
            })(el.querySelector('#_' + old))

            style({
                borderColor: 'black',
                background: '#ffdddd'
            })(el.querySelector('#_' + mode().name))

            return mode().name
        })
    ]

    return h([
        'div.keyboard',
        state.input($('placeholder')),
        ['input',
            { value: state.input() },
            state.input(),
            on.input((e, state) => {
                state.input(e.target.value)
            })],

        on.test0((...args) => console.log(args, args[0].detail), 'custom?'),

        style({
            display: 'flex',
            width: '100%',
            flexDirection: 'column'
        }),
        [
            'div.clock',
            (el) => {
                const update = () => el.innerHTML = new Date()
                setInterval(update, 1000)
                update()
            }],
        Modes,
        [
            'div.rows',

            ['div', effect((el) => {
                el.innerHTML = state.input()(el)
            })],

            on.click((e) => dispatch.test0(e.caller, 'test?!')),

            style({
                aspectRatio: 2.7,
                display: 'flex',
                flexDirection: 'column'
            }),
            ...rows().map((row) => [
                'div.row', style({
                    display: 'flex',
                    flex: '1 0',
                    minHeight: 0
                }),
                ...row.map(key => Array.isArray(key)
                    ? [
                        'div',
                        style({
                            display: 'flex',
                            minWidth: 0,
                            flex: `${key[0].span} ${key[0].span}`,
                            flexDirection: 'column'
                        }),
                        ...key.map(key => [
                            'div',
                            style({
                                flex: '1 1',
                                minWidth: 0,
                                minHeight: 0,
                                display: 'flex'
                            }),
                            [
                                'div#' + key.key,
                                style(buttonStyle(key)),
                                key.display || key.key
                            ]
                        ])
                    ]
                    : [
                        'div',
                        style({
                            display: 'flex',
                            minWidth: 0,
                            flex: `${key.span} ${key.span}`
                        }),
                        [
                            'div#' + key.key,
                            style(buttonStyle(key)),
                            key.key]
                    ])
            ])
        ],

        effect(el => keys().map(key => {
            const current = mode()
            const fallback = modes[current.fallback]
            const handler = current[key] || fallback?.[key]

            const display = handler?.display
                || current?.default?.(key, current)?.display
                || fallback?.default?.(key, current)?.display

            el.querySelector('#' + key).innerHTML = display
                ? Array.isArray(display)
                    ? h(display).innerHTML
                    : display
                : ''
        })),

        effect((el, old = []) => {
            old.map(code => style({
                boxShadow: '2px 2px 5px 3px gray',
                background: '#eeeeee',
                transform: 'scale(1)'
            })(el.querySelector('#' + code)))

            return held().map(e => {
                h([
                    el.querySelector('#' + e.code),
                    style({
                        boxShadow: '1px 1px 3px 1px gray',
                        background: '#ddffdd',
                        transform: 'scale(0.9)'
                    })])
                return e.code
            })
        }),

        history && [
            'div#history',
            on.click(console.log, 'logging!'),
            effect(el => {
                el.replaceChildren(...history().map(
                    event => h(['div', [event.TYPE, event.code, event.duration || ''].join(' ')])))
            })
        ]
    ])
}