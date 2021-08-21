/*
* contextmenu-directives.js
* @deprecated 右键菜单指令，这个指令只适用于右键菜单
* 通过 inserted 的钩子 给渲染后的目标元素绑定右键事件和id
* @author czh
* @create (czh 2021/4/14)
* @update (czh 2021/4/16)
*/
const contextmenuDirectives = {
  contextmenu:{
    // 使用 inserted 确保 contentmenu mounted 后才进行 addRef 操作
    inserted (el, binding, vnode) {
      //获取绑定 contentmenu 组件
      const node = vnode.context.$refs[binding.arg] || vnode.context.$refs[binding.value]
      const contextmenu = Object.prototype.toString.call(node) === '[object Array]' ? node[0] : node
      //调用组件 addRef 给触发dom添加右键事件，并缓存记录
      contextmenu.addRef({ el, vnode })
      //设置组件id
      contextmenu.$beContextmenuId = contextmenu._uid // eslint-disable-line no-underscore-dangle
    }
  }
}
export default contextmenuDirectives
