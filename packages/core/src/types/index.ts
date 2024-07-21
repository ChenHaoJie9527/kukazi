export type ChildrenType = (SVGElement | string)[]

export interface SVGElement {
    type: string;
    attributes: Record<string, string>;
    children: ChildrenType
}

export interface ParseSVG {
    rootElement: SVGElement
}