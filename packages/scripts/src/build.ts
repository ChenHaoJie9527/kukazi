import { build as tsup } from 'tsup';

export async function build(args: string[]) {
  await tsup({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
  });
}