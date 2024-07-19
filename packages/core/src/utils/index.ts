import { SVGXML } from "@/constant";

export function getSvgElement(svgString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, SVGXML);
    const svgEle = doc.documentElement;
    return svgEle;
}