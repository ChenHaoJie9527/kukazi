import { defineConfig } from "vitest/config"
import { normalizePath } from "vite"
import path from "path"
import { viteStaticCopy } from "vite-plugin-static-copy"
import tds from "vite-plugin-dts"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "kukazi-core",
            fileName(format, entryName) {
                return `kukazi-core.${format}.js`
            },
        },
        rollupOptions: {
            external: [/^vitest/, /^node:/, 'fs', 'path', 'fs/promise'],
        },
        sourcemap: true,
        // 明确指定构建输出目录
        outDir: 'dist',
        // 构建前清空输出目录
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            // 为 Node.js 模块提供空的模拟
            fs: 'rollup-plugin-node-polyfills/polyfills/empty',
            path: 'rollup-plugin-node-polyfills/polyfills/path',
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ['./src/tests/setup.ts'],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(path.resolve(__dirname, "assets/*.svg")),
                    dest: "assets",
                },
            ],
        }),
        tds(),
        nodePolyfills({
            globals: {
                // 是否应该添加全局的 polyfills
                global: false,
            },
            // 批量打包哪些polyfills
            protocolImports: true
        })
    ]
})