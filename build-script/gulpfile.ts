// 打包方式：串行(series)  并行(parallel)
import { series, parallel } from "gulp";
import { genTypes } from "./gen-types";
import { withTaskName, run } from './utils';
import { outDir, beUIRoot } from "./utils/paths";

// gulp 不叫打包，做代码转化 vite

const copySourceCode = () => async () => {
  await run(`cp ${beUIRoot}/package.json ${outDir}/package.json`);
};

/**
 * 1. 打包样式
 * 2. 打包工具方法
 * 3. 打包所有组件
 * 4. 打包每个组件
 * 5. 生成一个组件库
 * 6. 发布组件
 */
export default series(
    withTaskName("clean", async () => run("pnpm run clean")), // 删除dist目录
   parallel(
     // 打包 utils
   // withTaskName("buildUtils", () =>{
   //   run("pnpm run --filter @be-ui/build --parallel build:utils")
   // }), // 并行执行packages目录下的build脚本
   //  // 打包 style
   //  withTaskName("buildStyle", () =>{
   //      run("pnpm run --filter @be-ui/build --parallel build:style")
   //  })
      withTaskName("buildFullComponent", () =>
        run("pnpm run --filter @be-ui/build --parallel build:fullComponent")
      ), // 执行build命令时会调用rollup，给rollup传参数buildFullComponent，那么就会执行导出任务叫buildFullComponent
     // withTaskName("buildComponent", () => run("pnpm run build buildComponent"))
   ),
    // parallel(genTypes, copySourceCode())
);

// 任务执行器 gulp 任务名 就会执行对应的任务
// export * from "./full-component";
// export * from "./component";
