/**
 * 打包样式
 * 安装相关依赖
 * pnpm install gulp-sass @types/gulp-sass @types/sass gulp-autoprefixer @types/gulp-autoprefixer @types/gulp-clean-css gulp-clean-css -w -D
 * gulp-autoprefixer:添加样式前缀  gulp-clean-css：压缩css
 */
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import path from "path";

/**
 * gulp是类似一个管道的方式执行，从入口开始到出口，中间一步步执行
 */
import { series, src, dest } from "gulp";
import { outDir, projectRoot,styleRoot } from './utils/paths'
/**
 * 对sass文件做处理
 */
function compile() {
  const sass = gulpSass(dartSass);
  // 从src下的scss文件开始=>编译成css=>添加前缀=>压缩=>最终输出到当前目录下dist下的css目录
  return src(path.resolve(__dirname, `${styleRoot}/src/*.scss`))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .on('data',(data) => {
       let content = data.contents.toString()
       content = content.replaceAll('./fonts','be-ui/style/fonts')
       data.contents = new Buffer(content)
    })
    .pipe(cleanCss())
    .pipe(dest(`${styleRoot}/dist/css`));
}

/**
 * 处理font文件
 */
function copyfont() {
    // 从src下单fonts文件夹下的所有文件开始=>压缩=>最终输出到当前目录下dist下的font目录
    return src(path.resolve(__dirname,`${styleRoot}/src/fonts/**`)).pipe(dest(`${styleRoot}/dist/fonts`))
}

/**
 * 把打包好的css输出到根目录的dist
 */
function copyfullstyle(){
    const rootDistPath = path.resolve(projectRoot,'./dist/style')
    return src(path.resolve(styleRoot,'./dist/**')).pipe(dest(rootDistPath))
}

export default series(compile,copyfont,copyfullstyle);
