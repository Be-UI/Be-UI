// 专门打包util，指令，hook
import { series, parallel, src, dest } from 'gulp'
import { buildConfig } from './utils/config'
import path from 'path'
import { outDir, projectRoot } from './utils/paths'
import ts from 'gulp-typescript'
import { withTaskName } from './utils'

// 打包处理
export const buildPackages = (dirname: string, name: string) => {
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    // 安装依赖gulp-typescript
    return series(
      // 处理ts文件
      withTaskName(`build${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json') // ts配置文件路径
        const inputs = ['**/*.ts', '!gulpfile.js', '!node_modules']
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 需要生成声明文件
              strict: false, // 关闭严格模式
              module: config.module,
            })()
          )
          .pipe(dest(output))
      }),
      withTaskName(`copy:${dirname}`, () => {
        // 将打包好的文件放到 es=>utils 和 lib => utils
        // 将utils模块拷贝到dist目录下的es和lib目录
        return src(`${output}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)))
      })
    )
  })

  return parallel(...tasks)
}
