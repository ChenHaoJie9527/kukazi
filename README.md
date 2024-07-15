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

4. 思考

   - 最开始提到的，使用`TypeScript`静态语言开发，然而我无法搞清楚`TypeScript`究竟是在根目录里设置还是分别为每个子包单独设置，要如何达成一个平衡点呢？

     - 采用混合法，通常在根目录里设置`tsconfig.json`的一些基础配置，然后分别在每个子包设置各自的`tsconfig.json`配置，并通过`extends`选项引用根目录的`tsconfig.json`

     - 当前根目录`tsconfig.json`文件

       ```json
       {
         "compilerOptions": {
           "target": "ES2016",
           "module": "ESNext",
           "moduleResolution": "node",
           "declaration": true,
           "strict": true,
           "esModuleInterop": true,
           "skipLibCheck": true,
           "forceConsistentCasingInFileNames": true,
           "baseUrl": ".",
           "paths": {
             "@your-scope/*": ["packages/*/src"]
           }
         },
         "references": [
           { "path": "./packages/icons" },
           { "path": "./packages/react-icons" },
           { "path": "./packages/website" },
           { "path": "./packages/core" },
           { "path": "./packages/utils" },
           { "path": "./packages/types" },
           { "path": "./packages/scripts" }
         ],
         "exclude": ["node_modules", "**/dist"]
       }
       ```

     - 其他子包，以package/icons/tsconfig.json为例

       ```json
       {
         "extends": "../../tsconfig.json",
         "compilerOptions": {
           "outDir": "./dist",
           "rootDir": "./src",
           "composite": true,
           "declaration": true,
           "declarationMap": true,
         },
         "include": ["src/**/*"],
         "exclude": ["node_modules", "dist"]
       }
       ```

   - 为什么根目录里的`tsconfig.json`会出现警告，说子包里的`tsconfig.json`必须拥有设置 "`composite`": `true`

     - 出现这个问题的原因是在于根目录`tsconfig.json`里使用`references`选项，这些被引用的子包是复合项目，允许更快的类型检查和增量编译

     - 解决办法：在每个子包里的tsconfig.json新增三个选项

       ```json
       {
       	"composite": true,
           "declaration": true,
           "declarationMap": true
       }
       ```

       这三个选项确保每个子包可以启用项目引用特性，改善**IDE**的性能和类型检查速度

   - 如何管理.`gitgnore`，是在根目录使用.`gitgnore`，还是为每个子包设置.`gitgnore`，这两者差异在哪里？

     - 统一在根目录里使用一个`gitgnore`文件，可以简化管理，避免冗余，当出现特殊情况时，比如`packages/react-icons/special-file.txt`，可以下探到指定的文件路径

   - `pnpm-lock.yaml`文件的作用

     - 这个文件记录项目所需的依赖树
     - 确保所有开发环境里使用相同版本依赖
     - 管理所有子包的依赖
     - 特别要注意.`gitgnore`里不要忽略`pnpm-lock.yaml`

   - `monorepo`工作方式是怎么运行的？

     根目录运行 `pnpm install`:

     - 是的，当你在根目录运行 `pnpm install`，它会安装根目录的 `package.json` 中列出的所有依赖，以及所有子包 `(workspace packages)` 的依赖。
     - pnpm 会读取 pnpm-workspace.yaml 文件来识别所有的子包。

     根目录安装的依赖: 当你在根目录安装 `@svgr/cli` 和 `@svgr/core`：

     ```
     Copy
     
     pnpm add -D @svgr/cli @svgr/core
     ```

     - 这些依赖会被安装到根目录的 node_modules 中。
     - 默认情况下，子包不能直接访问这些依赖。

     子包访问根目录依赖:

     - `pnpm` 使用严格的依赖管理，默认情况下，子包只能访问它们自己 `package.json` 中声明的依赖。

     - 但是，你可以通过以下方式让子包访问根目录的依赖： a. 在子包的 `package.json` 中声明这些依赖，但使用 `workspace` 协议：

       ```json
       {
         "devDependencies": {
           "@svgr/cli": "workspace:*",
           "@svgr/core": "workspace:*"
         }
       }
       ```

       b. 或者，你可以在根目录的 `package.json` 中使用 "`pnpm.overrides`" 字段来共享这些依赖：

       ```json
       {
         "pnpm": {
           "overrides": {
             "@svgr/cli": "^6.5.1",
             "@svgr/core": "^6.5.1"
           }
         }
       }
       ```

     最佳实践:

     - 对于大多数情况，建议在需要使用这些依赖的具体子包中声明它们。
     - 只有当某个依赖真的是整个项目都需要的，才考虑在根目录安装。
     - 使用 workspace 协议（如 `"workspace:*"`）可以确保所有包使用相同版本的依赖，并且可以共享安装。

     注意事项:

     - 如果你在根目录安装了开发依赖（使用 -D 或 --save-dev），这些依赖默认不会被子包继承。
     - 生产依赖（没有 -D 标志）会被所有子包继承，但这通常不是推荐的做法。

     查看依赖:

     - 你可以使用 `pnpm why <package-name>` 来查看某个包是如何被引入项目的。
     - `pnpm list` 可以展示当前包的依赖树。

5. 后续计划

