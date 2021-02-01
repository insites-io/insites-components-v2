import { Config } from '@stencil/core';
export const config: Config = {
  namespace: 'insites',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    { type: 'docs-readme' },
    { type: 'www', serviceWorker: null }
  ],
  enableCache: true
};
