import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./lib/index.js'],
  bundle: true,
  outfile: '@honkit-light-parsers.js',
  format: 'esm',
  target: ['es2020'],
  globalName: 'honkitLightParsers',
  platform: 'node',
  banner: {
    js: '// honkitLightParsers - ESM Browser Bundle\n'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

await esbuild.build({
  entryPoints: ['./lib/index.js'],
  bundle: true,
  outfile: '@honkit-light-parsers.min.js',
  format: 'esm',
  target: ['es2020'],
  globalName: 'honkitLightParsers',
  platform: 'node',
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

console.log('Build completed!');
