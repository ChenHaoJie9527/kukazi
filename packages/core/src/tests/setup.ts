import { vi } from "vitest"

// 模拟文件系统
vi.mock('fs', () => {
    return {
        default: {
            readFileSync: vi.fn((filePath: string) => {
                // 根据文件路径返回模拟的文件内容
                if (filePath.endsWith('test0.svg')) {
                    return `
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
                        <path fill="currentColor" fill-rule="evenodd" d="M.5 1a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 1 0V9h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H1V1.5A.5.5 0 0 0 .5 1" clip-rule="evenodd" />
                    </svg>
                    `
                }
                throw new Error('File not found: ' + filePath)
            }),
            existsSync: vi.fn(() => true)
        }
    }
})