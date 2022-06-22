const falsy = thing => !!thing

export default (layout) => {
    const rows = layout.split('\n').filter(falsy)
    const keys = rows.map((r, row) => r.split(' ').map((k, column) => {
        const [span, key] = k.match(/^(\d+\.?\d*)(.*)/)?.slice(1) || [1, k]

        return { key: key === 'none' ? '' : key, row, column, span }
    }))

    const merged = keys.flat().filter(key => key.key.startsWith('-'))

    merged.forEach(key => {
        const prev = keys[key.row][key.column - 1]
        keys[key.row][key.column - 1] = [prev, { ...key, key: key.key === '-none' ? '' : key.key.slice(1) }]
        keys[key.row][key.column] = false
        console.log(keys[key.row])
    })

    const filtered = keys.map(row => row.filter(falsy))

    const buttonStyle = `
        margin: 3px;
        min-width: 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    `

    return [
        'div', {
            class: 'keyboard',
            style: `
                display: flex;
                width: 100%;
                flex-direction: column;
            `
        }, ...filtered.map((row) => [
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
                        min-width: 0;
                        flex: ${key[0].span} ${key[0].span};
                        flex-direction: column;`
                    }, ...key.map(key => [
                        'div',
                        {
                            id: key.key,
                            style: `
                                flex: 1 1;
                                ${key.key ? 'border: 2px solid gray' : ''};
                            ` + buttonStyle
                        },
                        key.key
                    ])
                ]
                : [
                    'div',
                    {
                        id: key.key,
                        style: `
                            height: 3rem;
                            flex: ${key.span} ${key.span};
                            ${key.key ? 'border: 2px solid gray' : ''};
                        ` + buttonStyle
                    },
                    key.key
                ])
        ])
    ]
}