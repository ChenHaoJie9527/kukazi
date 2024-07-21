import { dirname, join, extname, basename } from "path"
import { readFile, writeFile, readdir } from "fs/promises"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export {
    __filename,
    __dirname,
    readFile,
    writeFile,
    readdir,
    join,
    extname,
    basename
}

