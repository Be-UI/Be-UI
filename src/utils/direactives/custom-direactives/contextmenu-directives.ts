/*
* contextmenu-directives.ts
* @deprecated 右键菜单指令，这个指令只适用于右键菜单
* 通过 inserted 的钩子 给渲染后的目标元素绑定右键事件和id
* @author czh
* @create (czh 2021/4/14)
* @update (czh 2021/4/16)
*/
import {
    DirectiveBinding,
    ObjectDirective,
    VNode,
} from 'vue'
import {VNodeArrayChildren, VNodeChild, VNodeNormalizedChildren} from "@vue/runtime-core";
import {VNodeNormalizedRefAtom} from "../../types";
export const contextmenu:ObjectDirective= {
    // 使用 inserted 确保 contentmenu mounted 后才进行 addRef 操作
    mounted(el, binding:DirectiveBinding, vnode:VNode) {
        //获取绑定 contentmenu 组件
        const children:VNodeNormalizedChildren = vnode.children as Array<VNodeArrayChildren>
        let contextmenu:any = null
        try {
            children.forEach((childVNode)=>{
                let cVNode:VNode = childVNode as VNode
                let refs = cVNode.ref as VNodeNormalizedRefAtom
                if (refs.r && (refs.r === binding.arg || refs.r === binding.value)) {
                    contextmenu = cVNode
                    throw new Error('EndIterative');
                }
            })
        } catch (e) {
            if (e.message !== "EndIterative") throw e;
        }
        if (!contextmenu) return
        debugger
        console.log(contextmenu)
        //调用组件 addRef 给触发dom添加右键事件，并缓存记录
        contextmenu.component.ctx.addRef({el, vnode})
    }
}

