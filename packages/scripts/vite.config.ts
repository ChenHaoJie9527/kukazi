import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/cli.ts'),
            formats: ['es'],
            fileName: () => 'cli.js'
        },
        rollupOptions: {
            external: ['@kukazi/core']
        },
        outDir: 'dist',
        emptyOutDir: true,
    }
})