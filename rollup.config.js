/*
* @rollup.config.js
* @deprecated 
* @author czh
* @update (czh 2022/4/29)
*/
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve"
import vue from "@vitejs/plugin-vue"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import collectSass from 'rollup-plugin-collect-sass'
const config = {
    external: ['@popperjs/core',id => /.test.js/.test(id),'vue'],
    input: "./packages/components/index.ts", // 必须，入口文件
    output: [
        {
            file: './build/be-ui-umd.js',
            format: 'umd',
            name: 'be-ui',
            globals: {
                vue: "vue" // 告诉rollup全局变量Vue即是vue
            },


        },
        {
            file: './build/be-ui-es.js',
            format: 'es',
            name: 'be-ui',
            globals: {
                vue: "Vue" // 告诉rollup全局变量Vue即是vue
            },

        },
        {
            file: './build/be-ui-cjs.js',
            format: 'cjs',
            name: 'be-ui',
            globals: {
                vue: "Vue" // 告诉rollup全局变量Vue即是vue
            },

        }
    ],
    plugins: [ // 引入的插件在这里配置
        vue({
            css: true,
            isProduction: true,
            compileTemplate: true
        }),
        vueJsx(),
        resolve(),
        typescript(),
        postcss({
            plugins: [
                autoprefixer(),
                cssnano(),
            ],
            extract: 'index.css'
        }),
        babel({
            exclude: "**/node_modules/**",
           // presets: ["@vue/babel-plugin-jsx"]
        }),
        commonjs(),
    ]
}

export default config