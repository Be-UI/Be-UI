import type { DirectiveBinding, ObjectDirective, VNode } from 'vue'
export const contextmenu: ObjectDirective = {
  mounted(el, binding: DirectiveBinding, vnode: VNode) {
    // 获取绑定 contentmenu 组件
    const contextmenu = binding.instance?.$refs[binding.arg || binding.value] as any
    if (!contextmenu)
      return
    // 调用组件 addRef 给触发dom添加右键事件，并缓存记录
    contextmenu.addRef({ el, vnode })
  },
}
