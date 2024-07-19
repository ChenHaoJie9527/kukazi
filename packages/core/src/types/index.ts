export type ChildrenTpe = (SVGElement | string)[]

export interface SVGElement {
    type: string;
    attributes: Record<string, string>;
    children: ChildrenTpe
}

export interface ParseSVG {
    rootElement: SVGElement
}