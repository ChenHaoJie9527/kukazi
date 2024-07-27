
import path from 'path';
import fs from 'fs/promises';
import { parserSVG } from 'next-svg-parser';

const SVG_DIR = path.resolve(process.cwd(), 'src/assets');
const JSON_DIR = path.resolve(process.cwd(), 'src/json');
async function convertSvgFilesToJson() {
  try {
    // 确保 JSON 目录存在
    await fs.mkdir(JSON_DIR, { recursive: true });
    // 清空 json 目录
    await clearDirectory()
    // 读取所有 SVG 文件
    const files = await fs.readdir(SVG_DIR);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
    for (const svgFile of svgFiles) {
      const svgPath = path.join(SVG_DIR, svgFile);
      const jsonPath = path.join(JSON_DIR, `${path.basename(svgFile, '.svg')}.json`);
      // 读取 SVG 文件内容
      const svgContent = await fs.readFile(svgPath, 'utf-8');
      // 转换 SVG 到 JSON
      // const iconName = path.basename(svgFile, '.svg');
      // const relativePath = path.relative(process.cwd(), svgPath);
      const jsonData = parserSVG(svgContent);
      // // 写入 JSON 文件
      await fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2));

      console.log(`Converted ${svgFile} to JSON`);
    }

    console.log('All SVG files have been converted to JSON');
  } catch (error) {
    console.error('Error converting SVG files to JSON:', error);
  }
}

async function clearDirectory() {
  const files = await fs.readdir(JSON_DIR)
  for (const file of files) {
    await fs.unlink(path.join(JSON_DIR, file))
  }
}

convertSvgFilesToJson();
