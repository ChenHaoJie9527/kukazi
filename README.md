## 开发日记

1. 个人想法

   首先这是我的一个想法，这是关于开发一个内容是**SVG** **Icon**图标库的网站，目前开源的图标库都挺多的，我本人使用最多的是 **Lucide** (https://lucide.dev/)

   **Lucide**这个库操作简单，再编辑`svg`，支持多种代码格式，提供源文件等交互。加上**svg**矢量图标确实拥有得天独厚的优势，自然在心里也产生一些想法。

   借此目前已经失业，当前市场环境形势严峻，学历过低，难以找到工作，因此对自己的职业发展规划做一些重要的调整，催生出开发图标库是其中调整内容之一。

2. 学习计划

   - 学习使用`InKscape` 软件制作`SVG`图标
   - 学习 **SVG Tutorial** （https://svg-tutorial.com/）教程

3. 如何实施 or 计划

   - 使用**monorepo**作为项目架构
   - 默认使用**React**框架
   - 使用`TypeScript`静态语言
   - `pnpm`构建工具
   - **packages**子包分别是**icons**，**react-icons**，**website**，**core**，**utils**，**types**，**scripts**
     - icons目录，存储原始资源，不做具体实现，只提供图标服务
     - react-icons 这个包是将**SVG**图标转换为React组件的实现。专注于React特定的实现，而不影响原始图标
     - website 是用于展示和文档的网站包。将其作为单独的包，是因为它可以独立于库本身进行开发和部署
     - core 提供核心功能与基础组件
     - utils 提供辅助函数和工具，属性，常量等
     - types 该目录是集中管理`TypeScript`类型定义，将按照功能或者模块来组织类型定义文件
       - `index.ts`
       - `icon.ts`
       - `react-component.ts`
       - `common.ts`
       - `packge.json` 
     - scripts 集中管理构建和开发脚本，为什么不使用 build 而是scripts，因为scripts 语义上具有更广泛的意义
       - config 提供一些配置文件
       - utils 提供辅助函数
       - build 针对打包业务
       - dev 针对开发业务
       - test 针对测试业务

4. 后续计划

