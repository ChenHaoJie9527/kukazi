import { SVGXML } from "@/constant";
import figlet from "figlet"
import chalk from "chalk"
import boxen, { BorderStyle } from "boxen"
import { fsMock } from "@/mock/fs-mock"


export function getSvgElement(svgString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, SVGXML);
    const svgEle = doc.documentElement;
    return svgEle;
}

export function readSVGFile(fileName: string): string {
    return fsMock.getMockFileSystem().readFileSync(fileName) || '';
}

export function getAssetPath(fileName: string): string {
    return fileName;
}

export function mockSVGFiles(files: { [filename: string]: string }) {
    for (const [fileName, content] of Object.entries(files)) {
        fsMock.addMockFile(fileName, content);
    }
}

export function setTerminalMessage(message: any, files: any[], directory: string, callback?: (msg: any) => void) {
    try {
        figlet.text(
            "SVG Optimized!",
            {
                horizontalLayout: "default",
                verticalLayout: "default",
                whitespaceBreak: true,
            },
            (err, data) => {
                if (err) {
                    console.log("Error in figlet", err);
                    return;
                }
                console.log(chalk.cyan(data));

                const boxenMessage = boxen(
                    chalk.green(`Successfully optimized ${message.length} SVG files!\n`) +
                    chalk.yellow(`Total files processed: ${files.length}`),
                    { padding: 1, borderColor: "green", borderStyle: BorderStyle.Round }
                );
                console.log(boxenMessage);
            }
        );
    } catch (error) {
        callback?.(`Error optimizing SVGs in ${directory}:`);
        throw error;
    }
}