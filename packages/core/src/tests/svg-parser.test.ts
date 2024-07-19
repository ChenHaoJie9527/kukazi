import { describe, it, expect } from "vitest"
import { parseSVG } from "@/svg-parser"

describe("svgParser", () => {
    it("should correctly parse a simple SVG string", () => {
        const test = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M.5 1a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 1 0V9h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H1V1.5A.5.5 0 0 0 .5 1" clip-rule="evenodd"/></svg>'
        const result = parseSVG(test)

        expect(result.attributes).toEqual({
            width: '15',
            height: '15',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg'
        })
    })
    it('should throw an error for invalid SVG string', () => {
        const invalidSvgString = '<not-svg></not-svg>'
        const result = parseSVG(invalidSvgString)
        expect(result).toThrow('Invalid SVG string')
    })
})