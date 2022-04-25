/*
 * click-outside.ts
 * @deprecated dom元素外部点击指令
 * @author czh
 * @create (czh 2021/4/26)
 * @update (czh 2021/4/26)
 */
import { DirectiveBinding, ObjectDirective } from 'vue'

function defaultConditional(): boolean {
  return true
}

function directive(e: Event, el: Node, binding: DirectiveBinding): void {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler
  const isActive =
    (typeof binding.value === 'object' && binding.value.closeConditional) || defaultConditional
  if (!e || isActive(e) === false) return
  const elements = ((typeof binding.value === 'object' && binding.value.include) || (() => []))()
  elements.push(el)
  !elements.some((el: Node) => el.contains(e.target as HTMLElement)) &&
    setTimeout(() => {
      isActive(e) && handler && handler(e)
    }, 0)
}

export const ClickOutside: ObjectDirective = {
  beforeMount(el, binding): void {
    const isDisabled: boolean = typeof binding.value === 'object' && binding.value.isDisabled
    if (isDisabled) {
      return
    }
    const onClick = (e: Event) => directive(e, el, binding)
    const app: Node = document.querySelector('[data-app]') || document.body
    app.addEventListener('click', onClick, true)
    el._clickOutside = onClick
  },
  unmounted(el): void {
    if (!el._clickOutside) return
    const app: Node = document.querySelector('[data-app]') || document.body
    app && app.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  },
}
