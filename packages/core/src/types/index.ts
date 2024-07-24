export type ChildrenType = (SVGElement | string)[]

export interface SVGElement {
  type: string;
  attributes: Record<string, string>;
  children: ChildrenType
}

export interface ParseSVG {
  rootElement: SVGElement
}

export interface IconElement {
  tag: string;
  attrs: Record<string, string | number>;
  children: IconElement[];
}

export interface IconData {
  name: string;
  path: string;
  viewBox: string;
  elements: IconElement[];
}