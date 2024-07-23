# Contributing to Kukazi

首先，感谢您考虑为 Kukazi 项目做出贡献！我们欢迎来自社区的贡献，以使这个项目变得更好。

## 目录

1. [行为准则](#行为准则)
2. [如何贡献](#如何贡献)
3. [报告 Bug](#报告-bug)
4. [提出新功能](#提出新功能)
5. [提交拉取请求](#提交拉取请求)
6. [代码风格](#代码风格)
7. [commit 消息指南](#commit-消息指南)

## 行为准则

本项目采用 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。通过参与此项目，您同意遵守其条款。

## 如何贡献

有多种方式可以为 Kukazi 做出贡献：

- 报告 bug
- 提出新功能建议
- 改进文档
- 提交代码修复或新功能

## 报告 Bug

如果您发现了 bug，请通过 GitHub Issues 报告。在创建 issue 时，请包含以下信息：

- 简明的问题描述
- 重现问题的步骤
- 预期行为
- 实际行为
- 环境信息（操作系统、Node.js 版本等）

## 提出新功能

如果您有新功能的想法，我们也很乐意听取。请通过 GitHub Issues 提出您的建议，并尽可能详细地描述该功能及其用例。

## 提交拉取请求

1. Fork 该仓库并创建您的分支 (`git checkout -b feature/AmazingFeature`)
2. 进行您的更改
3. 确保您的代码遵循项目的代码风格
4. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
5. 推送到分支 (`git push origin feature/AmazingFeature`)
6. 打开一个拉取请求

## 代码风格

我们使用 ESLint 和 Prettier 来保持代码风格的一致性。请确保在提交代码之前运行 linter 和格式化工具。

- 使用 2 空格缩进
- 使用单引号
- 每行最大长度为 100 字符
- 使用分号
- 遵循 [TypeScript 编码指南](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)

在提交代码之前，请运行以下命令：

```bash
npm run lint
npm run format

## Commit 消息指南

我们使用 [约定式提交](https://www.conventionalcommits.o

常见的类型包括：

- feat: 新功能
- fix: 错误修复
- docs: 文档更改
- style: 不影响代码含义的更改（空白、格式化、缺少分号等）
- refactor: 既不修复错误也不添加功能的代码更改
- perf: 改进性能的代码更改
- test: 添加缺失的测试或纠正现有的测试
- chore: 对构建过程或辅助工具和库的更改

例如：

feat: 添加用户认证功能

fix: 修复 SVG 优化时的内存泄漏问题

