import {rollup} from "rollup";

export const build = async (config, buildConfig) => {
  const bundle = await rollup(config)
  return Promise.all(
    buildConfig.map((option) => {
      return bundle.write(option)
    }),
  )
}