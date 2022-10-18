import {series, parallel} from "gulp";
import { runTask } from "./utils/utils";
export default series(
  runTask("clean dist...", "pnpm run clean"), // 删除dist目录
  // 打包 utils
  runTask("building utils...", "pnpm run --filter @be-ui/build --parallel build:utils"),
  // 打包 style
  runTask("building style...", "pnpm run --filter @be-ui/build --parallel build:style"),
  // 打包 組件，按照目錄結構打包、保持 utils引用
  // 打包 組件，所有組件打在一起，保持 utils引用
);