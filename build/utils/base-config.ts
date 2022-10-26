import {outUtilsDirCjs, outUtilsDirEsm} from "./path-dict";

export const buildConfig = [
  {
    file: `${outUtilsDirEsm}/index.js`,
    format: 'es',
    inlineDynamicImports: true,
    name: 'index',
  },
  {
    file: `${outUtilsDirCjs}/index.cjs`,
    format: 'cjs',
    inlineDynamicImports: true,
    name: 'index',
  },
]
