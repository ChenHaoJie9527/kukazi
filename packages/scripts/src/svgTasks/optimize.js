// import { optimize } from "svgo";
// import * as fs from "../utils/fs";
// import * as path from "../utils/path";
// import { setTerminalMessage } from "../utils/terminal";
const { optimize } = require("svgo");
const fs = require("../utils/fs");
const path = require("../utils/path");
const { setTerminalMessage } = require("../utils/terminal");

/**
 *
 * @param {string} filePath svg文件路径
 * @description 优化SVG文件函数 读取文件 -> 优化内容 -> 写回文件
 */
async function optimizeSvg(filePath) {
  try {
    const svgString = await fs.readFile(filePath, "utf8");
    const result = optimize(svgString, { path: filePath });
    await fs.writeFile(filePath, result.data);
  } catch (error) {
    console.error(`Error optimizing SVGs in ${filePath}:`, error);
    throw error;
  }
}

/**
 *
 * @param {string} directory 目录路径
 * @description 批量优化目录里的所有svg文件
 */
async function optimizeSvgsInDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    const svgFiles = files.filter((file) => path.extname(file) === ".svg");
    const results = await Promise.all(
      svgFiles.map((file) => getOptimizeSvgList(directory, file))
    );
    // console.log(`Successfully optimized ${results.length} SVG files.`);
    setTerminalMessage(results, files);
    return `Successfully optimized ${results.length} SVG files.`;
  } catch (error) {
    console.error(`Error optimizing SVGs in ${directory}:`, error);
    throw error;
  }
}

function getOptimizeSvgList(directory, file) {
  return optimizeSvg(path.join(directory, file));
}

module.exports = {
  optimizeSvg,
  optimizeSvgsInDirectory,
}
