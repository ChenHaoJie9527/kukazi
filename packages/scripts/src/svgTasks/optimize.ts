import { optimize } from 'svgo';
import * as fs from '../utils/fs';
import * as path from '../utils/path';

export async function optimizeSvg(filePath: string): Promise<void> {
  const svgString = await fs.readFile(filePath, 'utf8');
  const result = optimize(svgString, { path: filePath });
  await fs.writeFile(filePath, result.data);
}

export async function optimizeSvgsInDirectory(directory: string): Promise<void> {
  const files = await fs.readdir(directory);
  for (const file of files) {
    if (path.extname(file) === '.svg') {
      await optimizeSvg(path.join(directory, file));
    }
  }
}