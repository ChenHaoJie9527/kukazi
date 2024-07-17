import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { defineConfig } from "rollup"

export default defineConfig([

    {
        input: 'bin/cli.cjs',
        output: {
            // dir: 'dist/bin',
            format: 'cjs',
            exports: 'named',
            file: 'dist/bin/cli.cjs'
        },
        // external: ['svgo', '../dist/index'] // 确保CLI可以正确引用主模块
    },
    {
        input: 'src/index.js',
        output: {
            format: "cjs",
            sourcemap: true,
            preserveModules: true,
            dir: 'dist',
            exports: 'named',
        },
        plugins: [
            resolve(),
            commonjs(),
        ],
        external: ['svgo', 'chalk', 'figlet', 'boxen']
    },
])