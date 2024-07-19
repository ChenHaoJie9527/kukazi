import { SVGXML } from "@/constant";
import path from "path";
import fs from "fs"

export function getSvgElement(svgString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, SVGXML);
    const svgEle = doc.documentElement;
    return svgEle;
}

export function reaSVGFile(fileName: string): string {
    const filePath = path.resolve(__dirname, '../../src/assets', fileName);
    return fs.readFileSync(filePath, 'utf-8')
}