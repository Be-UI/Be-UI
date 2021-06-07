const webpack = require('webpack');
module.exports = {
    publicPath: './',
    // outputDir: '../src/main/webapp/views',
    outputDir: 'views',
    assetsDir: 'assets/',
    runtimeCompiler: true,
    lintOnSave: 'warning',
    css: {
        sourceMap: true
    }
}