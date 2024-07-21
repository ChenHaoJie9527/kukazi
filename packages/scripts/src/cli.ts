#!/usr/bin/env node
import { optimizeSvgsInDirectory } from "@kukazi/core"
import { Command } from "commander"
import { commandMaps } from "./constant"

const program = new Command()

program.name('kukazi-scripts').description('CLI to optimize SVG files and perform other tasks')

program.command(commandMaps.optimize).description('Optimize all Svg files in the specified directory').action(async (directory) => {
    try {
        await optimizeSvgsInDirectory(directory)
    } catch (error) {
        console.error('Error optimizing SVG files:', error);
        process.exit(1);
    }
})