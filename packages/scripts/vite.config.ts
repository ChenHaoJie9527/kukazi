import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, "src/index.ts"),
                cli: path.resolve(__dirname, "src/cli.ts")
            },
            formats: ['es']
        },
        rollupOptions: {
            external: ["@kukazi-core"],
        },
        outDir: 'dist',
        emptyOutDir: true,
    }
})