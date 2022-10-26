import {series,parallel} from 'gulp'
import {run, runTask} from './utils/utils'
import {beUIRoot, outDir} from "./utils/path-dict";
import fs from 'fs-extra'
const copyPackageJson = () => async () => {
  await fs.copySync(`${beUIRoot}/package.json`, `${outDir}/package.json`)
}

export default series(
  runTask('clean dist...', 'pnpm run clean'),
   runTask("building utils...", "pnpm run --filter @be-ui/build --parallel build:utils"),
   runTask("building style...", "pnpm run --filter @be-ui/build --parallel build:style"),
  runTask('building component...', 'pnpm run --filter @be-ui/build --parallel build:component'),
  runTask('building be-ui...', 'pnpm run --filter @be-ui/build --parallel build:entry'),

   parallel(copyPackageJson())
)
