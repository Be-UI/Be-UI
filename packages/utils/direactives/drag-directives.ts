/*
 * drag-directives.ts
 * @deprecated 拖拽指令
 * @author xuqianqian
 * @create (xuqianqian 2021/4/16)
 * @update (czh 2021/4/16)
 */
import { DirectiveBinding, ObjectDirective } from 'vue'
import { IEvent } from '../type/types'

export const dragDirective: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding): void {
    const op: HTMLElement = el
    op.style.transform = 'translate(0%, 0%)'
    op.style.position = 'absolute'
    // 设置不拖拽就直接返回
    if (binding.value && (binding.value.isDrag === false || binding.value.isDrag === 'false')) {
      return
    }
    if (op.firstChild) {
      ;(op.firstChild as HTMLElement).style.cursor = 'move'
    }
    // 调证分析- 交易所中的信息区也可拖动
    let otherEle: Element | null = null
    const childrenList: HTMLCollection = op.children
    for (let i = 0; i < childrenList.length; i++) {
      if (childrenList[i].className && childrenList[i].className.indexOf('info-tag') > -1) {
        otherEle = childrenList[i]
        break
      }
    }

    el.onmousedown = (e: MouseEvent) => {
      let isTitle = false
      const E: MouseEvent = e
      if ((E as IEvent).path) {
        //遍历，只允许拖拽标题时触发移动
        for (let i = 0; i < (E as IEvent).path.length; i++) {
          //由标题触发拖拽，必然经过firstChild
          if (op.firstChild === (E as IEvent).path[i] || otherEle === (E as IEvent).path[i]) {
            isTitle = true
            break
          }
          //由其他元素触发拖拽，不会经过firstChild，必然经过op
          if (op.firstChild === (E as IEvent).path[i]) {
            isTitle = false
            break
          }
        }
      } else {
        // 兼容下火狐
        isTitle = true
      }
      if (!isTitle) {
        return
      }
      const offsetWidth = document.body.offsetWidth
      const offsetHeight = document.body.offsetHeight
      if (offsetWidth === 0 || offsetHeight === 0) {
        console.error('Please set the width and height of the body element')
        return
      }
      const disX = e.clientX - op.offsetLeft
      const disY = e.clientY - op.offsetTop
      const curTarget: EventTarget | null = e.currentTarget
      const eWidth = (curTarget as HTMLInputElement).offsetWidth
      const eHeight = (curTarget as HTMLInputElement).offsetHeight
      let ix = 0
      document.onmousemove = e => {
        if (ix > 1) {
          let left = e.clientX - disX
          let top = e.clientY - disY
          const maxLeft = offsetWidth - eWidth
          const maxBottom = offsetHeight - eHeight
          if (top < 0) {
            top = 0
          }
          if (left < 0) {
            left = 0
          }
          if (top > maxBottom) {
            top = maxBottom
          }
          if (left > maxLeft) {
            left = maxLeft
          }
          op.style.left = left + 'px'
          op.style.top = top + 'px'
          op.style.transform = 'translate(0%, 0%)'
          //将移动后的top和left回调出去
          if (
            binding.value &&
            Object.prototype.toString.call(binding.value) === '[object Function]'
          ) {
            binding.value({ left, top })
          }
        }
        ix++
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
}
