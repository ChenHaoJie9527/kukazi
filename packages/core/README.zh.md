# Kukazi Core Package

[English](./README.md)

## 简介

Kukazi Core 是一个专为 SVG 图标优化和管理而设计的强大工具包。它提供了一系列功能，包括 SVG 文件的读取、优化和写入，以及内存文件系统的管理，旨在简化 SVG 处理流程并提高效率。

## 主要功能

- SVG 文件优化
- 内存文件系统管理
- 文件系统操作（读取、写入）
- 路径规范化
- 跨平台兼容性

## 安装

使用 npm 安装 Kukazi Core 包：

```bash
npm install @kukazi/core
```

## 使用指南

### 初始化文件系统管理器

在使用其他功能之前，首先需要初始化文件系统管理器：

```js
import { fsManager } from '@kukazi/core';

fsManager.initialize('/path/to/svg/directory');
```

### 优化 SVG 文件

优化指定目录下的所有 SVG 文件：

```js
import { optimizeSvgsInDirectory } from '@kukazi/core';

async function optimizeSVGs() {
  try {
    const result = await optimizeSvgsInDirectory('/path/to/svg/directory');
    console.log(result);
  } catch (error) {
    console.error('SVG 优化失败:', error);
  }
}

optimizeSVGs();
```

### 使用内存文件系统

读取、写入和列出内存文件系统中的文件：

```js
import { fsManager } from '@kukazi/core';

// 读取文件
const fileContent = fsManager.readFile('/path/to/file.svg', { encoding: 'utf8' });

// 写入文件
fsManager.writeFile('/path/to/new-file.svg', svgContent);

// 列出目录内容
const files = fsManager.readdir('/path/to/directory');
```

## API 参考

### FSManager

- `initialize(rootDir: string): void` - 初始化文件系统管理器
- `readFile(path: string, options: { encoding: string }): string` - 读取文件
- `writeFile(path: string, data: string): void` - 写入文件
- `readdir(path: string): string[]` - 读取目录内容
- `saveToRealFS(): void` - 保存到实际文件系统

### SVG 优化

- `optimizeSvgsInDirectory(directory: string): Promise<string>` - 优化指定目录下的所有 SVG 文件

## 注意事项

- 在使用任何文件系统操作之前，必须先调用 `fsManager.initialize`。
- 所有路径操作都会自动进行规范化，以确保跨平台兼容性。
- 优化后的文件会自动覆盖原文件，请确保有重要文件的备份。
- 本包使用内存文件系统进行操作，可能会占用大量内存，请根据实际情况合理使用。

## 贡献

我们欢迎社区贡献！如果您发现了 bug 或有改进建议，请创建 issue 或提交 pull request。对于重大更改，请先开启一个 issue 进行讨论。

## 许可

有关许可信息，请参阅项目根目录中的 LICENSE 文件。
