import { ChildrenType, ParseSVG, SVGElement } from "./types";
import { getSvgElement } from "./utils";

export function parseSVG(svgString: string): ParseSVG {
    const svgEle = getSvgElement(svgString);
    if (svgEle.nodeName !== 'svg') {
        throw new Error('Invalid SVG: Root element is not <svg>')
    }

    return {
        rootElement: parseElement(svgEle)
    }
}

function parseElement(ele: Element): SVGElement {
    const attributes: Record<string, string> = {}
    for (const attr of (ele.attributes as any)) {
        attributes[attr.name] = attr.value;
    }

    const children: ChildrenType = []
    for (const child of (ele.childNodes as any)) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            children.push(parseElement(child))
        } else if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent?.trim()
            if (text) {
                children.push(text)
            }
        }
    }

    return {
        type: ele.nodeName.toLowerCase(),
        attributes,
        children
    }

}