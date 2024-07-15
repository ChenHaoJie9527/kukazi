#!/usr/bin/env node
import { svgTasks } from '../src';

const [,, command, ...args] = process.argv;

switch (command) {
  case 'optimize-svg':
    svgTasks.optimizeSvgsInDirectory(args[0] || process.cwd());
    break;
  case 'generate-svg-index':
    svgTasks.generateIndex(args[0] || process.cwd());
    break;
  default:
    console.error('Unknown command:', command);
    process.exit(1);
}