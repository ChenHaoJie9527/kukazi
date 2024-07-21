#!/usr/bin/env node
import { optimizeSvgsInDirectory } from "@kukazi/core"
import { commandMaps } from "./constant"
const [, , command, ...args] = process.argv

switch (command) {
    case commandMaps.parse:

        break;


    case commandMaps.optimize:
        optimizeSvgsInDirectory(args[0] || process.cwd()).catch(err => console.error(err))
        break;
    default:
        console.error("Unknown command:", command);
        process.exit(1);
}