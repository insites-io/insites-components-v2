import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'insites',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    { type: 'docs-readme' },
    { type: 'www', serviceWorker: null }
  ],
  enableCache: true,
  plugins: [
    sass()
  ]
};
