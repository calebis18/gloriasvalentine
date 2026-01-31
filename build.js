/* eslint-env node */
import * as esbuild from 'esbuild';

import fs from 'fs';

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['src/main.jsx'],
      bundle: true,
      outfile: 'dist/bundle.js',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      inject: ['./react-shim.js'],
      define: { 'process.env.NODE_ENV': '"development"' },
      sourcemap: true,
    });
    
    // Copy public files
    if (fs.existsSync('public')) {
      fs.cpSync('public', 'dist', { recursive: true });
    }

    console.log('Build complete');
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

build();
