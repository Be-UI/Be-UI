/*
 * contextmenu-directives.ts
 * @deprecated 右键菜单指令，这个指令只适用于右键菜单
 * 通过 inserted 的钩子 给渲染后的目标元素绑定右键事件和id
 * @author czh
 * @create (czh 2021/4/14)
 * @update (czh 2021/4/16)
 */
import { DirectiveBinding, ObjectDirective, VNode } from 'vue'
import { IContextMenu } from '../../components/contextmenu/src/be-contextmenu-type'
export const contextmenu: ObjectDirective = {
  mounted(el, binding: DirectiveBinding, vnode: VNode) {
    //获取绑定 contentmenu 组件
    const contextmenu = binding.instance?.$refs[binding.arg || binding.value] as IContextMenu
    if (!contextmenu) return
    //调用组件 addRef 给触发dom添加右键事件，并缓存记录
    contextmenu.addRef({ el, vnode })
  },
}
