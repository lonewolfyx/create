import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: [
		'cjs',
		'esm',
		'iife'
	],
	clean: true,
	dts: true,
	minify: true,
	splitting: true
})
