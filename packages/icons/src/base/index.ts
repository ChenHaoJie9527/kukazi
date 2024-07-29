import { IconProps, IconMetaData, IconElement, IconAttributes } from "./types"
import { IconMetaDataManager } from "./IconMetadata"

export class BaseIcon {
  private props: IconProps
  private metadata: IconMetaData

  constructor(props: IconProps) {
    this.props = props
    this.metadata = IconMetaDataManager.load(props.name)
  }

  render(): string {
    const modifiedMetaData = this.applyProps(this.metadata)
    return this.generateSvg(modifiedMetaData)
  }

  private applyProps(element: IconElement): IconElement {
    const newElement = { ...element }
    if (this.props.size) {
      newElement.attributes.width = this.props.size
      newElement.attributes.height = this.props.size
    }

    if (this.props.color) {
      this.applyColorRecursively(newElement)
    }

    if (this.props.rotate) {
      newElement.attributes.transform = `rotate(${this.props.rotate})`
    }

    newElement.children = newElement.children.map(child => this.applyProps(child))

    return newElement
  }

  private applyColorRecursively(element: IconElement) {
    if (element.attributes.fill === 'currentColor') {
      element.attributes.fill = this.props?.color ?? ''
    }
    element.children.forEach(child => this.applyColorRecursively(child))
  }

  private generateSvg(element: IconElement): string {
    const attributes = this.stringifyAttributes(element.attributes)
    const children = element.children.map(child => this.generateSvg(child)).join('')
    return `<${element.tagName} ${attributes}>${children}</${element.tagName}>`;
  }

  private stringifyAttributes(attributes: IconAttributes): string {
    return Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  }
}