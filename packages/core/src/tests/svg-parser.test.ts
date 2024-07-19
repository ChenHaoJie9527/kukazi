import { describe, it, expect } from "vitest"
import { parseSVG } from "@/svg-parser"
import { SVGElement } from "@/types"
import { reaSVGFile } from "@/utils"

describe("svgParser", () => {
    it("should correctly parse a simple SVG string", () => {
        const svgString = reaSVGFile('test.svg')
        const result = parseSVG(svgString)
        expect(result.rootElement).toEqual({
            type: 'svg',
            attributes: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: '15',
                height: '15',
                fill: 'none'
            },
            children: [
                {
                    type: 'path',
                    attributes: {
                        fill: 'currentColor',
                        'fill-rule': 'evenodd',
                        d: 'M.5 1a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 1 0V9h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H1V1.5A.5.5 0 0 0 .5 1',
                        'clip-rule': 'evenodd'
                    },
                    children: []
                }
            ]
        })

    })
    it('should parse complex SVG with nested elements', () => {
        const svgString = reaSVGFile('test1.svg')
        const result = parseSVG(svgString);
        // console.log(result.rootElement.children);
        expect(result.rootElement.attributes).toEqual({ width: '24', height: '24', viewBox: '0 0 24 24' })
        expect(result.rootElement.children).toHaveLength(1)
        const gElement = result.rootElement.children[0] as unknown as SVGElement
        expect(gElement.type).toBe('g')
        expect(gElement.attributes).toEqual({
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        })

        expect(gElement.children).toHaveLength(3)
        gElement.children.forEach(child => {
            expect((child as SVGElement).type).toBe('path')
            expect((child as SVGElement).attributes).toHaveProperty('d')
        })
    })

    // it('should throw an error for invalid SVG string', () => {
    //     const invalidSvgString = '<div></div>'
    //     expect(() => parseSVG(invalidSvgString)).toThrow('Invalid SVG string')
    // })
})