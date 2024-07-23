// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      // 添加更多规则...
    },
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
];