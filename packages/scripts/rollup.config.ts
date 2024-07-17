import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { defineConfig } from "rollup"

export default defineConfig([

    {
        input: 'bin/cli.cjs',
        output: {
            dir: 'dist/bin',
            format: 'cjs'
        },
        // external: ['svgo', '../dist/index'] // 确保CLI可以正确引用主模块
    },
    {
        input: 'src/index.js',
        output: {
            format: "cjs",
            sourcemap: true,
            preserveModules: true,
            dir: 'dist'
        },
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json'
            })
        ],
        external: ['svgo']
    },
])