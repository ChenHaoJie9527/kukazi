import { defineConfig } from "vitest/config"
import { normalizePath } from "vite"
import path from "path"
import { viteStaticCopy } from "vite-plugin-static-copy"

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
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
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
    ]
})