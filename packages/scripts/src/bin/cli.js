#!/usr/bin/env node

const { build } = require('../dist/build');
const { test } = require('../dist/test');

const [,, command, ...args] = process.argv;

switch (command) {
  case 'build':
    build(args);
    break;
  case 'test':
    test(args);
    break;
  default:
    console.error('Unknown command:', command);
    process.exit(1);
}