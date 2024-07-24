export interface IconElement {
  tag: string;
  attrs: Record<string, string>;
  children: IconElement[];
}

export interface IconData {
  name: string;
  path: string;
  viewBox: string;
  elements: IconElement[];
}