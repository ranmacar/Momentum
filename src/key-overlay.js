export default (layout) => {
    const rows = layout.split('\n')
    const keys = rows.map((r, row) => r.split(' ').map((k, column) => {
        const [span, key] = k.match(/^(\d)(.*)/)?.slice(1) || [1, k]
        return { key, row, column, span }
    }))
    const columns = Math.max(...keys.map((row) => row.length))
    const flat = keys.flat()

    return [
        'div', {
            class: 'keys',
            style: `
                display: grid;
                grid-template-columns: repeat(${columns}, 1fr);
                grid-template-rows: repeat(${rows.length}, 1fr);
            `
        }, ...flat.map((key) => [
            'div', {
                class: 'key',
                style: `
                    border: 1px solid gray;
                    margin: 1px;
                    grid-row: ${key.row + 1};
                    grid-column: span ${key.span}`
            }, [
                'span',
                key.key
            ]
        ])
    ]
}