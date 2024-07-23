# Kukazi Core Package

[中文版](./README.zh.md)

## Introduction

Kukazi Core is a powerful toolkit designed for SVG icon optimization and management. It provides a suite of functionalities including reading, optimizing, and writing SVG files, as well as managing an in-memory file system. This package aims to streamline SVG processing workflows and enhance efficiency.

## Key Features

- SVG file optimization
- In-memory file system management
- File system operations (read, write)
- Path normalization
- Cross-platform compatibility

## Installation

Install the Kukazi Core package using npm:

```bash
npm install @kukazi/core
```

## Usage Guide

### Initializing the File System Manager

Before using other features, initialize the file system manager:

```js
import { fsManager } from '@kukazi/core';

fsManager.initialize('/path/to/svg/directory');
```

### Optimizing SVG Files

Optimize all SVG files in a specified directory:

```js
import { optimizeSvgsInDirectory } from '@kukazi/core';

async function optimizeSVGs() {
  try {
    const result = await optimizeSvgsInDirectory('/path/to/svg/directory');
    console.log(result);
  } catch (error) {
    console.error('SVG optimization failed:', error);
  }
}

optimizeSVGs();
```

### Using the In-Memory File System

Read, write, and list files in the in-memory file system:

```js
import { fsManager } from '@kukazi/core';

// Read a file
const fileContent = fsManager.readFile('/path/to/file.svg', { encoding: 'utf8' });

// Write a file
fsManager.writeFile('/path/to/new-file.svg', svgContent);

// List directory contents
const files = fsManager.readdir('/path/to/directory');
```

### Saving Optimized Files

Save files from memory to the actual file system:

```js
import { fsManager } from '@kukazi/core';

fsManager.saveToRealFS();
```

## API Reference

### FSManager

- `initialize(rootDir: string): void` - Initialize the file system manager
- `readFile(path: string, options: { encoding: string }): string` - Read a file
- `writeFile(path: string, data: string): void` - Write a file
- `readdir(path: string): string[]` - Read directory contents
- `saveToRealFS(): void` - Save to the actual file system

### SVG Optimization

- `optimizeSvgsInDirectory(directory: string): Promise<string>` - Optimize all SVG files in the specified directory

## Important Notes

- Always call `fsManager.initialize` before using any file system operations.
- All path operations are automatically normalized to ensure cross-platform compatibility.
- Optimized files will overwrite the original files. Ensure you have backups of important files.
- This package uses an in-memory file system, which may consume significant memory. Use judiciously based on your requirements.

## Contributing

Community contributions are welcome! If you find a bug or have a suggestion for improvement, please create an issue or submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

```txt
This English version of the README.md file for the core package provides a comprehensive overview of the package's functionality, installation instructions, usage examples, API reference, and important notes. It maintains the structure of the original document while omitting the license section as per your preference.

If you need any adjustments or additional information included in this document, please let me know, and I'll be happy to make the necessary changes.
```

