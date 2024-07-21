import { vi } from "vitest"
import { basename, join, dirname } from "@/helpers"

type Files = { [filename: string]: string }

class FSMock {
    private mockFiles: Map<string, string> = new Map<string, string>()
    constructor() { }
    addMockFile(fileName: string, content: string) {
        this.mockFiles.set(fileName, content)
    }
    clearMockFiles() {
        this.mockFiles.clear()
    }

    getMockFileSystem() {
        return {
            promise: {
                readdir: vi.fn((dirPath: string) => {
                    const files = Array.from(this.mockFiles.keys()).filter((filePath) => dirname(filePath) === dirPath)
                    return Promise.resolve(files)
                }),
                writeFile: vi.fn(),
                readFile: vi.fn((filePath: string) => {
                    const { bool, fileName } = this.hasMocksInFileName(filePath)
                    if (bool) {
                        return Promise.resolve(this.mockFiles.get(fileName))
                    }
                    return Promise.reject(new Error(`File not found: ${filePath}`))
                })
            },
            readFileSync: vi.fn((filePath: string) => {
                const { bool, fileName } = this.hasMocksInFileName(filePath)
                if (bool) {
                    return this.mockFiles.get(fileName)
                }
                throw new Error(`File not found: ${filePath}`)
            }),
            existsSync: vi.fn((filePath: string) => {
                const { bool } = this.hasMocksInFileName(filePath)
                return bool
            })
        }
    }
    private hasMocksInFileName(filePath: string) {
        const fileName = basename(filePath)
        const bool = this.mockFiles.has(filePath)
        return {
            bool,
            fileName
        }
    }
    getMockFiles() {
        return this.mockFiles
    }

    mockDirectory(directoryPath: string, files: Files) {
        for (const [fileName, content] of Object.entries(files)) {
            this.addMockFile(join(directoryPath, fileName), content)
        }
    }
}

export const fsMock = new FSMock()

vi.mock('fs', () => fsMock.getMockFileSystem())