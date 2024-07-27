// icons/scripts/convertSvgToJson.ts

// const path = require('path');
import path from 'path';
// const fs = require('fs/promises');
import fs from 'fs/promises';
// import { svgToJsonConverter } from '@kukazi/core';
// import { parserSVG } from 'next-svg-parser';

const SVG_DIR = path.resolve(process.cwd(), 'src/assets');
const JSON_DIR = path.resolve(process.cwd(), 'src/json');
async function convertSvgFilesToJson() {
  try {
    // 确保 JSON 目录存在
    await fs.mkdir(JSON_DIR, { recursive: true });

    // 读取所有 SVG 文件
    const files = await fs.readdir(SVG_DIR);
    const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
    for (const svgFile of svgFiles) {
      const svgPath = path.join(SVG_DIR, svgFile);
      const jsonPath = path.join(JSON_DIR, `${path.basename(svgFile, '.svg')}.json`);
      // 读取 SVG 文件内容
      const svgContent = await fs.readFile(svgPath, 'utf-8');
      // 转换 SVG 到 JSON
      const iconName = path.basename(svgFile, '.svg');
      const relativePath = path.relative(process.cwd(), svgPath);
      // const result = parserSVG(svgContent);
      // console.log('result =>', result);
      // const jsonData = svgToJsonConverter({ svgContent, iconName, relativePath });

      // // 写入 JSON 文件
      // await fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2));

      // console.log(`Converted ${svgFile} to JSON`);
    }

    console.log('All SVG files have been converted to JSON');
  } catch (error) {
    console.error('Error converting SVG files to JSON:', error);
  }
}

convertSvgFilesToJson();
