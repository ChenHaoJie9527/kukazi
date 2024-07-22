import { optimize } from "svgo";
import { basename, extname, join, } from "@/helpers"
// import { setTerminalMessage } from "@/utils";
import { fsManager } from "@/fs-manager"

/**
 *
 * @param {string} filePath svg文件路径
 * @description 优化SVG文件函数 读取文件 -> 优化内容 -> 写回文件
 */
// export async function optimizeSvg(filePath: string) {
//     try {
//         const svgString = await readFileSync(filePath, "utf-8");
//         const result = optimize(svgString.toLocaleString(), { path: filePath });
//         await writeFileSync(filePath, result.data);
//     } catch (error) {
//         console.error(`Error optimizing SVGs in ${filePath}:`, error);
//         throw error;
//     }
// }

async function optimizeSvg(filePath: string): Promise<string> {
    try {
        console.log(`Optimizing file: ${filePath}`);
        // const svgString = readFileSync(filePath, 'utf8') as string;
        const svgString = fsManager.readFile(filePath, {
            encoding: 'utf8',
        });
        const result = optimize(svgString);
        fsManager.writeFile(filePath, result.data)
        return `Optimized: ${basename(filePath)}`;
    } catch (error) {
        console.error(`Error optimizing ${filePath}:`, error);
        throw error;
    }
}

/**
 *
 * @param {string} directory 目录路径
 * @description 批量优化目录里的所有svg文件
 */
// export async function optimizeSvgsInDirectory(directory: string) {
//     try {
//         const files = await readdirSync(directory);
//         console.log('files =>', files);
//         const svgFiles = files.filter((file) => extname(file.toLocaleString()).toLowerCase() === ".svg");
//         console.log('svgFiles =>', svgFiles);
//         const results = await Promise.all(
//             svgFiles.map((file) => getOptimizeSvgList(directory, file.toLocaleString().toLocaleLowerCase()))
//         );
//         console.log('results =>', results);
//         // console.log(`Successfully optimized ${results.length} SVG files.`);
//         setTerminalMessage(results, files, directory);
//         return `Successfully optimized ${results.length} SVG files.`;
//     } catch (error) {
//         console.error(`Error optimizing SVGs in ${directory}:`, error);
//         throw error;
//     }
// }

export async function optimizeSvgsInDirectory(directory: string) {
    try {
        console.log(`Attempting to read directory: ${directory}`);
        const files = fsManager.readdir(directory);
        // console.log('files =>', files);

        const svgFiles = files.filter((file) => extname(file).toLowerCase() === ".svg");
        console.log(`Found ${svgFiles.length} SVG files.`);

        if (svgFiles.length === 0) {
            console.warn(`No SVG files found in ${directory}`);
            return "No SVG files found to optimize.";
        }

        const results = await Promise.all(
            svgFiles.map((file) => optimizeSvg(join(directory, file)))
        );

        console.log(`Optimization results:`, results);

        return `Successfully optimized ${results.length} SVG files.`;
    } catch (error) {
        console.error(`Error optimizing SVGs in ${directory}:`, error);
        throw error;
    }
}