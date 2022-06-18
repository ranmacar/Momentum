import { Handler } from "vite-plugin-mix";

import * as fs from 'fs';

export const handler = (req, res, next) => {
    if (req.path === '/update') {
        try {
            const content = JSON.stringify({some: Math.random()}, false, 4) 
            console.log(content)
            fs.writeFileSync('./src/data.json', content)
        } catch (err) {
            console.error(err)
        }
        return res.end('update files from web ide!')
    }
    next()
}
