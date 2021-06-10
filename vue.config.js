const webpack = require('webpack');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, './', dir)
}
module.exports = {
    publicPath: './',
    // outputDir: '../src/main/webapp/views',
    outputDir: 'views',
    assetsDir: 'assets/',
    runtimeCompiler: true,
    lintOnSave: 'warning',
    css: {
        sourceMap: true
    },
    /*链式配置，解决qiankun框架加载子服务图标显示方块问题*/
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icon'))
            .end()
        config.module
            .rule('icon')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
            .end()
    }
}