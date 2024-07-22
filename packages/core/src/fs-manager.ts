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
        const json = this.getFileSystemJSON()
        for (const [filePath, content] of Object.entries(json)) {
            // 移除开头的斜杠并规范化路径
            const normalizedPath = path.normalize(filePath.replace(/^\//, ''));
            // 构建完整的文件路径
            const realPath = path.join(this.rootDir, normalizedPath);
            const splitPath = realPath.split(':')
            const result = `${splitPath[0]}:${splitPath[splitPath.length - 1]}`
            fs.writeFileSync(result, content)
        }
    }

    reset() {
        this.rootDir = ''
        this.vol = Volume.fromJSON({}, this.rootDir)
    }

    checkFileSystemJSON() {
        const writeFiles = this.vol.toJSON()
        console.log('writeFiles =>', writeFiles);
    }

    getFileSystemJSON(): { [filePath: string]: string } {
        return this.vol.toJSON();
    }

    readFile(filePath: string, options: { encoding: string }): string {
        const memPath = path.join('', filePath);
        return this.vol.readFileSync(memPath, options.encoding) as string;
    }

    writeFile(filePath: string, data: string): void {
        const memPath = path.join('', filePath);
        this.vol.writeFileSync(memPath, data);
    }

    readdir(dirPath: string): string[] {
        return this.loadFromRealFS(dirPath) as string[];
    }
}

export const fsManager = new FsManager()