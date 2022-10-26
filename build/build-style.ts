import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import { dest, series, src } from 'gulp'
import {outStyleDir, styleRoot} from "./utils/path-dict";
function compile() {
  const sass = gulpSass(dartSass)
  const entryPath = `${styleRoot}/src/*.scss`
  return src(entryPath)
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .on('data', (data) => {
      const content = data.contents.toString()
      // content = content.replaceAll('./fonts','be-ui/style/fonts')
      data.contents = Buffer.from(content)
    })
    .pipe(cleanCss())
    .pipe(dest(outStyleDir))
}

/**
 * handle font file
 */
/* function copyfont() {
  return src(path.resolve(__dirname,`../packages/style/src/fonts/!**`)).pipe(dest(`../packages/style/dist/fonts`))
}

/!**
 * css build files save to dist
 *!/
function copyfullstyle(){
  const rootDistPath = path.resolve(projectRoot,'./dist/style')
  return src(path.resolve(styleRoot,'./dist/!**')).pipe(dest(rootDistPath))
} */

export default series(compile)
