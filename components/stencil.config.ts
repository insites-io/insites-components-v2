import { Config } from '@stencil/core';
export const config: Config = {
  namespace: 'insites-components',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    { type: 'docs-readme' },
    { type: 'www', serviceWorker: null }
  ],
  enableCache: true,
  globalScript: 'src/globals/context.ts',
};
