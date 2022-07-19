
export const standard = {
    name: 'standard',
    default(code, mode) {
        const key = code.match(/Key(\w)/)?.[1]?.toLowerCase?.()
        if (key) return {
            display: key,
            default: true,
            tap: () => console.log(key)
        }

        const digit = code.match(/Digit(\d)/)?.[1]
        if (digit !== undefined) return {
            display: digit,
            default: true,
            tap: () => console.log(digit)
        }

        const fn = code.match(/F(\d+)/)?.[1]
        if (fn) return {
            display: code,
            default: true,
            tap: () => console.log(code)
        }

        const [modifier, position] = code.match(/(Alt|Shift|Control|Meta|Command|Option)(Left|Right)/)?.slice?.(1) || []
        if (modifier) return {
            display: modifier,
            tap: () => console.log(modifier, position)
        }

        const mapping = {
            Escape: {
                display: 'Esc',
                tap: () => console.log('Escape')
            },
            Fn: {
                display: 'Fn',
            },
            Prnt: {
                display: 'Prnt',
                tap: () => console.log('Prnt')
            },
            Insert: {
                display: 'Ins',
                tap: () => console.log('Insert')
            },
            Delete: {
                display: 'Del',
                tap: () => console.log('Delete')
            },
            Backspace: {
                display: '⇐',
                tap: () => console.log('Prnt')
            },
            Tab: {
                display: 'Tab',
                tap: () => console.log('Tab')
            },
            CapsLock: {
                display: 'Caps',
                tap: () => console.log('Caps')
            },
            Enter: {
                display: 'Enter',
                tap: () => console.log('Enter')
            },
            Space: {
                display: '',
                tap: () => console.log('Space')
            },
            BracketLeft: {
                display: '[',
                tap: () => console.log('[')
            },
            BracketRight: {
                display: ']',
                tap: () => console.log(']')
            },
            Quote: {
                display: "'",
                tap: () => console.log("'")
            },
            Backquote: {
                display: '`',
                tap: () => console.log('`')
            },
            Minus: {
                display: '-',
                tap: () => console.log('-')
            },
            Equal: {
                display: '=',
                tap: () => console.log('=')
            },
            Slash: {
                display: '/',
                tap: () => console.log('/')
            },
            Backslash: {
                display: '\\',
                tap: () => console.log('\\')
            },
            IntlBackslash: {
                display: '<',
                tap: () => console.log('<')
            },
            Comma: {
                display: ',',
                tap: () => console.log(',')
            },
            Period: {
                display: '.',
                tap: () => console.log('.')
            },
            Semicolon: {
                display: ';',
                tap: () => console.log(';')
            },
            ArrowLeft: {
                display: '🡐',
                tap: () => console.log('🡐')
            },
            ArrowUp: {
                display: '🡑',
                tap: () => console.log('🡑')
            },
            ArrowDown: {
                display: '🡓',
                tap: () => console.log('🡓')
            },
            ArrowRight: {
                display: '🡒',
                tap: () => console.log('🡒')
            }
        }[code]

        if (mapping) return {
            ...mapping,
            default: true
        };

    },
    toggle: {
        Escape: 0,
        ShiftLeft: 2,
        ShiftRight: 2
    },
}

export const shifted = {
    name: 'shifted',
    fallback: 1,
    default(code, mode) {
        const key = code.match(/Key(\w)/)?.[1]
        if (key) return {
            display: key,
            default: true,
            tap: () => console.log(key)
        }

        const mapping = {
            Digit1: {
                display: '!',
                tap: () => console.log('!')
            },
            Digit2: {
                display: '@',
                tap: () => console.log('@')
            },
            Digit3: {
                display: '#',
                tap: () => console.log('#')
            },
            Digit4: {
                display: '$',
                tap: () => console.log('$')
            },
            Digit5: {
                display: '%',
                tap: () => console.log('%')
            },
            Digit6: {
                display: '^',
                tap: () => console.log('^')
            },
            Digit7: {
                display: '&',
                tap: () => console.log('&')
            },
            Digit8: {
                display: '*',
                tap: () => console.log('*')
            },
            Digit9: {
                display: '(',
                tap: () => console.log('(')
            },
            Digit0: {
                display: ')',
                tap: () => console.log(')')
            },
            BracketLeft: {
                display: '{',
                tap: () => console.log('{')
            },
            BracketRight: {
                display: '}',
                tap: () => console.log('}')
            },
            Quote: {
                display: '"',
                tap: () => console.log('"')
            },
            Backquote: {
                display: '~',
                tap: () => console.log('~')
            },
            Minus: {
                display: '_',
                tap: () => console.log('_')
            },
            Equal: {
                display: '+',
                tap: () => console.log('+')
            },
            Slash: {
                display: '?',
                tap: () => console.log('?')
            },
            Backslash: {
                display: '|',
                tap: () => console.log('|')
            },
            IntlBackslash: {
                display: '>',
                tap: () => console.log('>')
            },
            Comma: {
                display: '<',
                tap: () => console.log('<')
            },
            Period: {
                display: '>',
                tap: () => console.log('>')
            },
            Semicolon: {
                display: ':',
                tap: () => console.log(':')
            },
            ArrowLeft: {
                display: '🡐',
                tap: () => console.log('🡐')
            },
            ArrowUp: {
                display: '🡑',
                tap: () => console.log('🡑')
            },
            ArrowDown: {
                display: '🡓',
                tap: () => console.log('🡓')
            },
            ArrowRight: {
                display: '🡒',
                tap: () => console.log('🡒')
            }
        }[code]

        if (mapping) return {
            ...mapping,
            default: true
        }
    },
    toggle: {
        Escape: 0,
    },
}

export default {
    standard,
    shifted
}