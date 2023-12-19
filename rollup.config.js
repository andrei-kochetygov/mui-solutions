import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-ts';
import analyze from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import url from 'url';

const currentWorkingDir = path.dirname(url.fileURLToPath(import.meta.url));

const sources = {
  root: '.',
  packages: ['inputs', 'utils'],
};

const inputs = [...sources.packages.map((pkg) => `${sources.root}/packages/${pkg}`), sources.root];

export default inputs.map((input) => ({
  input: `${input}/src/index.ts`,
  output: {
    file: `${input}/dist/index.esm.js`,
    sourcemap: true,
    exports: 'named',
    format: 'esm',
  },
  external: [/node_modules/],
  plugins: [
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx'],
      entries: {
        '@mui-solutions/inputs': `${currentWorkingDir}/packages/inputs/src`,
      },
    }),
    resolve(),
    typescript(),
    commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    terser(),
    analyze({
      hideDeps: true,
      limit: 0,
      summaryOnly: true,
    }),
  ],
}));
