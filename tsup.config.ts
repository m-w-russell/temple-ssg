import { defineConfig } from 'tsup';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  entry: ['src/lib.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  clean: true,
  shims: true,
  publicDir: 'src/public', 
  bundle: true, 

  async onSuccess() {
    const rootPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

    const distPkg = {
      name: rootPkg.name || "temple-ssg",
      version: rootPkg.version || "1.0.0",
      description: rootPkg.description || "A simple Typescript-based site generator. Designed to be user-extendable.",
      author: rootPkg.author || "m-w-russell",
      license: rootPkg.license || "ISC",
      type: "module",
      
      main: "./lib.cjs",
      module: "./lib.js",
      types: "./lib.d.ts",
      
      exports: {
        ".": {
          types: "./lib.d.ts",
          import: "./lib.js",
          require: "./lib.cjs"
        }
      },
      dependencies: rootPkg.dependencies || {}
    };

    fs.writeFileSync(
      path.resolve(__dirname, 'dist', 'package.json'),
      JSON.stringify(distPkg, null, 2)
    );

    fs.copyFileSync(path.resolve(__dirname, 'README.md'), path.resolve(__dirname, 'dist', 'README.md'))

    console.log('⚡ Standalone Node package generated successfully inside dist/');
  }
});
