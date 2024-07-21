import { describe, it, expect, vi, afterEach } from "vitest"
import { generateIndex } from "../svg-indexer"
import fs from "fs"
import path from "path"
import { fsMock } from "@/mock/fs-mock"

vi.mock("fs")
vi.mock("path")

describe("svg generateIndex", () => {
    const mockDirectory = path.resolve(__dirname, "../assets")
    afterEach(() => {
        vi.clearAllMocks()
        fsMock.clearMockFiles()
    })

    it("should generate index file for SVG files in directory", async () => {

        fsMock.addMockFile('test.svg', `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
                <path fill="currentColor" fill-rule="evenodd"
                d="M.5 1a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 1 0V9h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H1V1.5A.5.5 0 0 0 .5 1"
                clip-rule="evenodd" />
            </svg>    
        `)
        fsMock.addMockFile('test1.svg', `
            <svg width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </g>
            </svg>   
        `)
        // 模拟 readdir 返回文件列表
        vi.spyOn(fs.promises, 'readdir').mockResolvedValue(['test.svg', 'test1.svg'] as any)

        // 模拟writeFile
        const writeFileMock = vi.spyOn(fs.promises, 'writeFile').mockResolvedValue(undefined)
        const result = await generateIndex(mockDirectory);
    })
})