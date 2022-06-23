import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
    {
        input: './src/index.ts',
        output: {
            file: './lib/rollup/index.js',
            format: 'iife',
            name: "multilang"
        },
        plugins: [
            typescript(),
            nodeResolve(),
            commonjs(),
        ],
    }
];