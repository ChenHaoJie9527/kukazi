import { readFileSync } from "fs"
import { join } from "path"
import { IconMetaData } from "./types"

export class IconMetaDataManager {
  private static cache: Record<string, IconMetaData> = {}
  private static readonly JSON_DIR = join(__dirname, '..', '/json')

  static load(name: string) {
    if (this.cache[name]) {
      return this.cache[name]
    }
    const jsonPath = join(this.JSON_DIR, `${name}.json`);
    const jsonContent = readFileSync(jsonPath, 'utf-8');
    const metaData: IconMetaData = JSON.parse(jsonContent)
    this.cache[name] = metaData
    return metaData
  }

}