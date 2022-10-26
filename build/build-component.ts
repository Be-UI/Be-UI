import path from 'path'
import fs from 'fs-extra'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import typescript from 'rollup-plugin-typescript2'
import { series } from 'gulp'
import { sync } from 'fast-glob' // 同步查找文件
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import glob from 'fast-glob'
import type { SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'
import * as VueCompiler from '@vue/compiler-sfc'
import { buildConfig } from './utils/base-config'
import {build, getFileSuffix, getFormatOutputPath, pathRewriterBySplit} from './utils/utils'
import {compRoot, outCompDir, outDir, tsConfigRoot} from "./utils/path-dict";
const plugins = [
    typescript({tsconfig: tsConfigRoot}),
    vue({ isProduction: true }),
    vueJsx(),
    resolve(),
    commonjs(),
    // terser(),
    cleanup({ comments: 'none' }),
  ]

const setBuildOption = (filePath: string, rewrite?:Function) =>{
  return buildConfig.map(config => {
    const { format } = config
    return {
      format,
      file: path.resolve(outDir, `${getFormatOutputPath(format)}${filePath}.${getFileSuffix(format)}`),
      paths: rewrite,
      exports: 'named',
    }
  })
}

const buildEachComponent = async () => {
  const files = sync('*', {
    cwd: compRoot,
    onlyDirectories: true,
    ignore:['node_modules']
  })

  const builds = files.map(async (file: string) => {
    const config = {
      input:path.resolve(compRoot, file, 'index.ts'),
      plugins,
      external: (id: string) => id.startsWith('vue') || id.startsWith('@be-ui') || /^.test./.test(id) || id.startsWith('@popperjs') ,
    }
    const options = setBuildOption(`/components/${file}/index`,pathRewriterBySplit())
    try {
      await build(config, options)
    }catch (e) {
      console.error(e)
    }

  })
  return Promise.all(builds)
}

const buildEachComponentEntry = async () => {
  const config = {
    input: `${compRoot}/index.ts`,
    plugins: plugins,
    external: (id: string) => id.startsWith('./') || id.startsWith('@popperjs') ,
  }
  const options = setBuildOption(`/components/index`)
  return await build(config, options)
}

const buildEachComponentType = async () => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      skipLibCheck: true,
      strict: false,
      outDir: outCompDir,
      preserveSymlinks:true,
      noLib:false
    },
    tsConfigFilePath: tsConfigRoot,
    skipAddingFilesFromTsConfig: true,
  })
  const filePaths = await glob(['**/*.ts', '**/*.vue','**/*.tsx'], {
    cwd: compRoot,
    onlyFiles: true,
    absolute: true,
    ignore:['node_modules','**/*.test.tsx']
  })
  const sourceFiles: SourceFile[] = []
  await Promise.all(
    filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf8')
        const sfc = VueCompiler.parse(content)
        const { script } = sfc.descriptor
        if (script) {
          const content = script.content
          const sourceFile = project.createSourceFile(`${file}.ts`, content)
          sourceFiles.push(sourceFile)
        }
      }
      else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
  )
  const diagnostics = project.getPreEmitDiagnostics()
  // 输入解析过程中的错误信息
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))
  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput()
    const tasksSource = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filepath = outputFile.getFilePath()
      console.log(filepath)
      // 插件类型组件需要生成src下类型
      if(filepath.indexOf('src') > 0 && !/-plugin/.test(filepath)) return
      const outputPathCjs = filepath.replace('dist/components/packages','dist/lib')
      const outputPathEsm = filepath.replace('dist/components/packages','dist/es')
      await fs.outputFile(outputPathCjs,pathRewriterBySplit()(outputFile.getText()))
      await fs.outputFile(outputPathEsm, pathRewriterBySplit()(outputFile.getText()))
    })
    await Promise.all(tasksSource)
  })
  await Promise.all(tasks)
}
// buildEachComponent,buildEachComponentEntry,buildEachComponentType
export default series(buildEachComponent,buildEachComponentEntry,buildEachComponentType)
