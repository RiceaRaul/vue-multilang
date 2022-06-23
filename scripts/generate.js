/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const fs = require('fs')
const path = require('path')

const resolve = p => path.resolve(__dirname, p)

async function main () {
    fs.copyFileSync(resolve('../lib/esm/index.d.ts'), resolve('../lib/index.d.ts'))
    fs.copyFileSync(resolve('../lib/esm/index.js'), resolve('../lib/index.esm.js'))
    fs.copyFileSync(resolve('../lib/cjs/index.js'), resolve('../lib/index.cjs.js'))

    fs.rmSync(resolve('../lib/cjs'), { recursive: true })
    fs.rmSync(resolve('../lib/esm'), { recursive: true })
}

main()
    .then(() => console.log('done'))
    .catch(e => console.error(e.stack))