import { dirname, join, extname, basename } from "path"
import { fs } from "memfs"

const { readFileSync, writeFileSync, readSync, readdirSync, existsSync, readdir } = fs

// const {readFile, writeFile, readdir} = fs.promises
export {
    readFileSync,
    writeFileSync,
    readSync,
    readdirSync,
    join,
    extname,
    basename,
    dirname,
    existsSync,
    readdir
}

