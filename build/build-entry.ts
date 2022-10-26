import path from 'path'
import fs from 'fs-extra'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import typescript from 'rollup-plugin-typescript2'
import { series } from 'gulp'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import glob from 'fast-glob'
import type { SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'
import { buildConfig } from './utils/base-config'
import {build, getFileSuffix, getFormatOutputPath, pathRewriterBySplit} from './utils/utils'
import {beUIRoot, compRoot, outCompDir, outDir, tsConfigRoot} from "./utils/path-dict";
const plugins = [
    typescript({tsconfig: tsConfigRoot}),
    vue({ isProduction: true }),
    vueJsx(),
    resolve(),
    commonjs(),
    terser(),
    cleanup({ comments: 'none' }),
  ]
const rewritePath = () =>{
  return id => id.replaceAll('@be-ui', `.`)
}
const setBuildOption = (filePath) =>{
  return buildConfig.map(config => {
    const { format } = config
    return {
      format,
      file: path.resolve(outDir, `${getFormatOutputPath(format)}${filePath}.${getFileSuffix(format)}`),
      paths: rewritePath(),
      exports: 'named',
    }
  })
}


const buildUIEntry = async () => {
  const config = {
    input: `${beUIRoot}/index.ts`,
    plugins: plugins,
    external: (id: string) => id.startsWith('@be-ui'),
  }
  const options = setBuildOption(`/index`)
  try {
    return await build(config, options)
  }catch (e) {
    console.error(e)
  }
}

const buildUIEntryType = async () => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      skipLibCheck: true,
      strict: false,
      outDir,
      preserveSymlinks:true,
    },
    tsConfigFilePath: tsConfigRoot,
    skipAddingFilesFromTsConfig: true,
  })
  const filePaths = await glob(['**/*.ts'], {
    cwd: beUIRoot,
    onlyFiles: true,
    absolute: true,
    ignore:['node_modules']
  })
  const sourceFiles: SourceFile[] = []
  await Promise.all(
    filePaths.map(async (file) => {
      const sourceFile = project.addSourceFileAtPath(file)
      sourceFiles.push(sourceFile)
    }),
  )
  // const diagnostics = project.getPreEmitDiagnostics()
  // // 输入解析过程中的错误信息
  // console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput()
    const tasksSource = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      await fs.outputFile(`${outDir}/es/index.d.ts`, rewritePath()(outputFile.getText()))
      await fs.outputFile(`${outDir}/lib/index.d.ts`, rewritePath()(outputFile.getText()))
    })
    await Promise.all(tasksSource)
  })
  await Promise.all(tasks)
}

export default series(buildUIEntry,buildUIEntryType)
