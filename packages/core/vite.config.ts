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
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
            // 批量打包哪些polyfills
            protocolImports: true,
            include: ['path', 'fs',],
            overrides: {
                fs: 'memfs'
            },
        })
    ]
})