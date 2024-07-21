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
            external: ["path", "fs/promises"],
            // output: {
            //     globals: {
            //         react: "React",
            //         "react-dom": "ReactDOM",
            //     },
            // },
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ['./src/tests/setup.ts']
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