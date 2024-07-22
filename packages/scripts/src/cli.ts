#!/usr/bin/env node
import { optimizeSvgsInDirectory, fsManager } from "@kukazi/core"
import { Command } from "commander"
import { commandMaps } from "./constant"
import { Volume } from "memfs"
import fs from "fs"
import path from "path"

const vol = Volume.fromJSON({})

const program = new Command()

program.name('kukazi-scripts').description('CLI to optimize SVG files and perform other tasks').version('1.0.0')

program.command(commandMaps.optimize)
    .description('Optimize all Svg files in the specified directory')
    .argument('<directory>', 'Directory to containing SVG files')
    .option('-v, --verbose', 'Output more information')
    .action(async (directory: string, options: { verbose?: boolean }) => {
        try {
            const absPath = path.resolve(process.cwd(), directory);
            console.log(`Optimizing SVGs in: ${absPath}`);

            fsManager.initialize(absPath)

            await optimizeSvgsInDirectory(absPath)

            // 将优化后的文件保存回实际文件系统
            // fsManager.saveToRealFS();
        } catch (error) {
            console.error('Error optimizing SVG files:', error);
            process.exit(1);
        }
    })

program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);
