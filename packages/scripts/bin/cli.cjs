#!/usr/bin/env node
const { svgTasks } = require('../index');
const [, , command, ...args] = process.argv;

switch (command) {
  case "optimize-svg":
    svgTasks.optimizeSvgsInDirectory(args[0] || process.cwd()).catch(console.error);
    break;
  case "generate-svg-index":
    svgTasks.generateIndex(args[0] || process.cwd()).catch(console.error);
    break;
  default:
    console.error("Unknown command:", command);
    process.exit(1);
}
