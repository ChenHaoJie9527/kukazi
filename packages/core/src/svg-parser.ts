import { ParseSVG } from "./types";

export function parseSVG(svgString: string): ParseSVG {
    const matchResult = svgString.match(/<svg([^>]*)>([\s\S]*)<\/svg>/)
    if (!matchResult) {
        throw new Error('Invalid SVG string');
    }

    const [, attributesString, content] = matchResult
    const attributes: Record<string, string> = {}
    attributesString.replace(/(\w+)="([^"]*)"/g, (_, key, value) => {
        attributes[key] = value
        return ''
    })

    return {
        attributes,
        content
    }
}