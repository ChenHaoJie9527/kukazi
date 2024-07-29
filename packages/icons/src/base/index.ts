import { IconProps, IconMetaData } from "./types"
import { IconMetaDataManager } from "./IconMetadata"

export class BaseIcon extends IconMetaDataManager {
  private props: IconProps
  private metadata: IconMetaData

  constructor(props: IconProps) {
    super()
    this.props = props
    this.metadata = this.load(props.name)
  }

  render() {
    
  }
}