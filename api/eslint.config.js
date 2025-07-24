import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import path from 'path';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: path.resolve(),
			},
		},
		rules: {
			'no-console': 'off',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
];
