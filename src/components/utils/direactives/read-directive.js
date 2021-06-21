/*
* read-directive.js
* @deprecated vue自定义指令装载脚本
* @author czh
* @create (czh 2021/4/16)
* @update (czh 2021/4/16)
*/

//扫描路径下的js文件，获取上下问
const scriptFile = require.context('./custom-direactives', false, /^\.\/.*\.js$/)
/**
 * 获取指令脚本
 * @returns {[]} 指令脚本数组缓存
 */
function getScriptFile(){
  let scriptArr = []
  scriptFile.keys().forEach(key =>{
    scriptArr = scriptArr.concat(scriptFile(key).default)
  })
  return scriptArr
}

/**
 * 挂载vue指令到 vue对象实例上
 * @param {{Object}} $vue - vue对象实例
 */
function mountDirective($vue){
  getScriptFile().forEach(vueDrective=>{
    Object.keys(vueDrective).forEach((key)=>{
      $vue.directive(key,vueDrective[key])
    })
  })

}
export default mountDirective
