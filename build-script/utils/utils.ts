import {rollup} from "rollup";
import { spawn } from 'child_process'
import path from "path"
import chalk from "chalk";
export const projectRoot = path.resolve(__dirname,'../../')

export const build = async (config, buildConfig) => {
  const bundle = await rollup(config)
  return Promise.all(
    buildConfig.map((option) => {
      return bundle.write(option)
    }),
  )
}

export const run = async command => {
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
    })
    app.on('close', resolve) //
  })
}

export const runTask = (displayName:string, command: string) => {
  const fn = async ()=>{
    console.log(chalk.blueBright.bold(`\n ${displayName}\n`))
    await run(command)
    console.log(chalk.greenBright.bold(`\n Successful !!!!!!!!\n`))
  }
  fn.displayName = displayName
  return fn
}