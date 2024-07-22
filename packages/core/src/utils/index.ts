import { SVGXML } from "@/constant";
import chalk from "chalk"
import boxen, { Options } from "boxen"
// import { fsMock } from "@/mock/fs-mock"


export function getSvgElement(svgString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, SVGXML);
    const svgEle = doc.documentElement;
    return svgEle;
}

// export function readSVGFile(fileName: string): string {
//     return fsMock.getMockFileSystem().readFileSync(fileName) || '';
// }

export function getAssetPath(fileName: string): string {
    return fileName;
}

// export function mockSVGFiles(files: { [filename: string]: string }) {
//     for (const [fileName, content] of Object.entries(files)) {
//         fsMock.addMockFile(fileName, content);
//     }
// }

export function setTerminalMessage(message: any, files: any[], directory: string, callback?: (msg: any) => void) {
    try {
        // 创建优化完成的消息
        const message = [
            chalk.green.bold(`Optimization complete!`),
            chalk.green(`Optimized number of files: ${chalk.yellow(files.length)}`),
            chalk.green(`Optimize file directory: ${chalk.yellow(directory)}`),
            '',
        ].join('\n');

        // 使用 boxen 创建一个漂亮的框
        const boxenOptions: Options = {
            padding: 1,
            margin: 1,
            borderColor: 'yellow',
            borderStyle: 'round',
            title: 'svg optimize',
            backgroundColor: 'cyan',
            titleAlignment: 'center'
        };

        const boxenMessage = boxen(
            message,
            boxenOptions,
        );
        console.log(boxenMessage);
    } catch (error) {
        callback?.(`Error optimizing SVGs in ${directory}:`);
        throw error;
    }
}