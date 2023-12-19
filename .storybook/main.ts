import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

function getCwd() {
  return dirname(fileURLToPath(import.meta.url));
}

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      define: { 'process.env': {} },
      resolve: {
        alias: [
          {
            find: '@mui-solutions/inputs',
            replacement: `${getCwd()}/../packages/inputs/src`,
          },
        ],
      },
    }),
};
export default config;
