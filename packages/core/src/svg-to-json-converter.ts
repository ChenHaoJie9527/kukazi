import { parse, Node, RootNode } from "svg-parser"
import { IconData, IconElement } from "@/types"


interface Props {
  iconName: string;
  svgContent: string;
  relativePath: string;
}
export function svgToJsonConverter({ iconName, svgContent, relativePath }: Props): IconData {
  const parsedSVG = parse(svgContent)
  const svgNode = findSvgNode(parsedSVG)

  if (!svgNode || svgNode.type !== 'element') {
    throw new Error('Invalid SVG: No SVG element found')
  }

  const viewBox = svgNode.properties?.viewBox as string | undefined
  if (!viewBox) {
    throw new Error('Invalid SVG: No viewBox attribute found')
  }

  const iconData: IconData = {
    name: iconName,
    path: relativePath,
    viewBox,
    elements: svgNode.children
      .map(child => (typeof child !== 'string' ? convertElement(child) : null))
      .filter((child): child is IconElement => child !== null)
  }

  return iconData;

}


function findSvgNode(eleNode: Node | RootNode) {
  if (eleNode.type === 'element' && eleNode.tagName === 'svg') {
    return eleNode;
  }

  if (eleNode.type === 'root') {
    if (Array.isArray(eleNode.children)) {
      for (const child of eleNode.children) {
        if (typeof child !== 'string' && child.type === 'element') {
          return findSvgNode(child)
        }
      }
    }
  }
  return null
}
function convertElement(element: Node): IconElement | null {
  if (element.type !== 'element' || typeof element.tagName !== 'string') {
    return null
  }

  return {
    tag: element.tagName,
    attrs: element.properties || {},
    children: element.children
      .map(child => (typeof child !== 'string' ? convertElement(child) : null))
      .filter((child): child is IconElement => child !== null)
  }
}