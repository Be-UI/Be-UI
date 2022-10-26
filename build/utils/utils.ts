import { spawn } from 'child_process'
import figlet from 'figlet'
import { rollup } from 'rollup'
import chalk from 'chalk'
import {projectRoot} from './path-dict'

export const build = async (config, buildConfig) => {
  const bundle = await rollup(config)
  return Promise.all(
    buildConfig.map((option) => {
      return bundle.write(option)
    }),
  )
}

export const run = async (command) => {
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
    })
    app.on('close', resolve) //
  })
}

export const runTask = (displayName: string, command: string) => {
  const fn = async () => {
    await ConsoleFigFont(displayName)
    console.log(chalk.blueBright.bold(`\n ${displayName}\n`))
    await run(command)
  }
  fn.displayName = displayName
  return fn
}

export const pathRewriterBySplit = () => {
  return id => {
    id = id.replaceAll('@be-ui', `../..`)
    return id
  }
}


export function ConsoleFigFont(str: string) {
  return new Promise((resolve, reject) => {
    figlet(str, (err, data) => {
      if (err) {
        console.warn('Something went wrong...')
        console.warn(err)
        reject(err)
      }
      console.warn(data)
      resolve('')
    })
  })
}

export const getFileSuffix = (format:string) => format === 'es' ? 'js' : 'cjs'

export const getFormatOutputPath = (format:string) => format === 'es' ? 'es' : 'lib'
