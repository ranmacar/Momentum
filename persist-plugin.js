import fs from 'fs';
import fp from "path";

export default ({
    file,
}) => ({
    name: 'persist',
    configureServer(server) {
        file && server.ws.on('persist:file', ({ path, data }) => {
            try {
                console.log(path)
                if (!Array.isArray(path)) path = [path
                ]
                const base = file.base || [__dirname]
                const filename = path.pop()
                const filepath = fp.resolve(...base, ...path)

                console.log(filepath, filename)

                if (!fs.existsSync(filepath)) fs.mkdirSync(filepath, {
                    recursive: true
                })

                fs.writeFileSync(fp.resolve(filepath, filename), data)

                console.info(`wrote ${name} into ${filepath}`)
            } catch (e) {
                console.log(e)
            }
        })
    }
})

export const persistFile = (path, data) => {
    const joined = path.join('/')
    const file = localStorage.getItem(joined)
    if (file !== data) import.meta.hot.send('persist:file', { path, data })
    localStorage.setItem(joined, data)
}