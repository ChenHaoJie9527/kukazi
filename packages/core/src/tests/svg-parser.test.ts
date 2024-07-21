import { describe, it, expect, afterEach, beforeEach } from "vitest"
import { parseSVG } from "@/svg-parser"
import type { SVGElement } from "@/types"
import { fsMock } from "@/mock/fs-mock"
import { mockSVGFiles, readSVGFile } from "@/utils"

const mockSVGContent = {
    'test1.svg': `
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        </svg>
    `,
    'test2.svg': `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none">
            <path fill="currentColor" fill-rule="evenodd" d="M.5 1a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 1 0V9h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H1V1.5A.5.5 0 0 0 .5 1" clip-rule="evenodd" />
        </svg>
    `,
    'not-svg': '<div>123</div>'
};

describe("svg Parser", () => {
    beforeEach(() => {
        mockSVGFiles(mockSVGContent);
    });

    afterEach(() => {
        fsMock.clearMockFiles();
    });
    it('should correctly parse test1.svg', () => {
        const svgContent = readSVGFile('test1.svg');
        const result = parseSVG(svgContent);

        expect(result.rootElement.attributes).toEqual({
            width: '24',
            height: '24',
            viewBox: '0 0 24 24'
        })
        expect(result.rootElement.children).toHaveLength(1)
        const children = result.rootElement.children[0] as unknown as SVGElement
        expect(children.type).toBe('path')
        expect(children.attributes).toEqual({
            d: 'M12 2L2 7l10 5 10-5-10-5z'
        })
        expect(children.children).toEqual([])
    });
    it('should correctly parse test2.svg', () => {
        const svgContent = readSVGFile('test2.svg');
        const result = parseSVG(svgContent);

        expect(result.rootElement.attributes).toEqual({
            xmlns: 'http://www.w3.org/2000/svg',
            width: '15',
            height: '15',
            fill: 'none'
        });
        expect(result.rootElement.children).toHaveLength(1)
        const children = result.rootElement.children[0] as unknown as SVGElement
        expect(children.type).toBe('path')
        expect(children.attributes).toEqual({
            fill: 'currentColor',
            'fill-rule': 'evenodd',
            d: 'M.5 1a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 1 0V9h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H1V1.5A.5.5 0 0 0 .5 1',
            'clip-rule': 'evenodd'
        })
    });
    it('should throw an error for non-existent file', () => {
        expect(() => readSVGFile('non-existent.svg')).toThrow();
    });
    it('should throw an error for Root element is not <svg>', () => {
        const svgContent = readSVGFile('not-svg');
        expect(() => parseSVG(svgContent)).toThrow(/^Invalid SVG: Root element is not <svg>$/);
    });
    it('should throw an error for invalid SVG content', () => {
        const invalidSVG = '<not-svg></not-svg>';
        expect(() => parseSVG(invalidSVG)).toThrow('Invalid SVG');
    })
})