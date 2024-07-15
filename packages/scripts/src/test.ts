import { run } from 'vitest/node';

export async function test(args: string[]) {
  await run(args);
}