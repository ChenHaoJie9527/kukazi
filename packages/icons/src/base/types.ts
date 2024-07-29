export interface IconAttributes {
  [key: string]: string | number;
}

export interface IconElement {
  tagName: string;
  type: string;
  attributes: IconAttributes;
  children: IconElement[];
}

export interface IconMetaData {
  tagName: string;
  type: string;
  attributes: IconAttributes;
  children: IconElement[];
}

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  rotate?: number;
}