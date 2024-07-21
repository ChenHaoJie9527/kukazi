import { extname, readdir, join, writeFile, basename } from "@/helpers"

/**
 * 
 * @param directory 指定目录
 * @returns 
 * @description 为目录中的所有 SVG 文件创建一个索引文件（index.ts），使得这些 SVG 文件可以更容易地被导入和使用
 */
export async function generateIndex(directory: string): Promise<string> {
    try {
        // 读取指定目录中所有文件
        const files = await readdir(directory)
        //查照片目录中所有的svg文件
        const svgFiles = files.filter((file: any) => extname(file) === '.svg');
        // 为每个svg文件创建一个导入语句
        const indexContent = svgFiles.map((file: any) => `export { default as ${basename(file, '.svg')} } from './${file}';`).join('\n');
        // 将生成得到内容写入到 index.ts文件中
        await writeFile(join(directory, 'index.ts'), indexContent);
        // 返回成功消息
        return `Successfully generated index for ${svgFiles.length} SVG files.`;
    } catch (error) {
        throw error
    }
}