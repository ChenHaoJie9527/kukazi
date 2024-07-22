import { Volume } from "memfs"
import fs from "fs"
import path from "path"

class FsManager {
    private vol: any
    private rootDir: string
    constructor() {
        this.rootDir = ''
    }

    initialize(rootDir: string) {
        this.rootDir = rootDir
        this.vol = Volume.fromJSON({}, rootDir)
    }

    loadFromRealFS(directory: string) {
        const files = fs.readdirSync(directory)
        files.forEach((file) => {
            const filePath = path.join(directory, file)
            if (fs.statSync(filePath).isFile() && path.extname(file).toLowerCase() === '.svg') {
                const content = fs.readFileSync(filePath, 'utf8')
                this.vol.writeFileSync(filePath, content)
            }
        })
        return files
    }

    saveToRealFS() {
        this.vol.readdirSync('/').forEach((file: string) => {
            const memPath = path.join('/', file)
            const realPath = path.join(this.rootDir, file)
            const content = this.vol.readFileSync(memPath, 'utf8')
            fs.writeFileSync(realPath, content)
        })
    }

    checkWriteFiles() {
        const writeFiles = this.vol.toJSON()
        console.log('writeFiles =>', writeFiles);
    }


    readFile(filePath: string, options: { encoding: string }): string {
        const memPath = path.join('', filePath);
        console.log('memPath =>', memPath);
        return this.vol.readFileSync(memPath, options.encoding) as string;
    }

    writeFile(filePath: string, data: string): void {
        const memPath = path.join('/', path.relative(this.rootDir, filePath));
        this.vol.writeFileSync(memPath, data);
    }

    readdir(dirPath: string): string[] {
        return this.loadFromRealFS(dirPath) as string[];
    }
}

export const fsManager = new FsManager()