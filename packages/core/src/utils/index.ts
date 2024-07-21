import { SVGXML } from "@/constant";
import path from "path";
import figlet from "figlet"
import chalk from "chalk"
import boxen, { BorderStyle } from "boxen"
import fs from "fs"

export function getSvgElement(svgString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, SVGXML);
    const svgEle = doc.documentElement;
    return svgEle;
}

export function reaSVGFile(fileName: string): string {
    const filePath = path.resolve(__dirname, '../../src/assets', fileName);
    return fs.readFileSync(filePath, 'utf-8')
}

export function setTerminalMessage(message: any, files: any[], directory: string, callback = (msg: string) => { }) {
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
        callback(`Error optimizing SVGs in ${directory}:`);
        throw error;
    }
}