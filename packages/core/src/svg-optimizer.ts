import { optimize } from "svgo";
import { readFile, writeFile, readdir, extname, join } from "@/helpers"
import { setTerminalMessage } from "@/utils";

/**
 *
 * @param {string} filePath svg文件路径
 * @description 优化SVG文件函数 读取文件 -> 优化内容 -> 写回文件
 */
export async function optimizeSvg(filePath: string) {
    try {
        const svgString = await readFile(filePath, "utf-8");
        const result = optimize(svgString, { path: filePath });
        await writeFile(filePath, result.data);
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
export async function optimizeSvgsInDirectory(directory: string) {
    try {
        const files = await readdir(directory);
        const svgFiles = files.filter((file) => extname(file) === ".svg");
        const results = await Promise.all(
            svgFiles.map((file) => getOptimizeSvgList(directory, file))
        );
        // console.log(`Successfully optimized ${results.length} SVG files.`);
        setTerminalMessage(results, files, directory);
        return `Successfully optimized ${results.length} SVG files.`;
    } catch (error) {
        console.error(`Error optimizing SVGs in ${directory}:`, error);
        throw error;
    }
}

function getOptimizeSvgList(directory: string, file: string) {
    return optimizeSvg(join(directory, file));
}

