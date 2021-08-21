/*
* click-outside.js
* @deprecated dom元素外部点击指令
* @author czh
* @create (czh 2021/4/26)
* @update (czh 2021/4/26)
*/

function defaultConditional () {
    return true
}

function directive (e, el, binding) {
    const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler
    const isActive = (typeof binding.value === 'object' && binding.value.closeConditional) || defaultConditional
    if (!e || isActive(e) === false) return
    const elements = ((typeof binding.value === 'object' && binding.value.include) || (() => []))()
    elements.push(el)
    !elements.some(el => el.contains(e.target)) && setTimeout(() => {
        isActive(e) && handler && handler(e)
    }, 0)
}

export const ClickOutside = {
    ClickOutside:{
        inserted (el, binding) {
            const isDisabled = (typeof binding.value === 'object' && binding.value.isDisabled)
            if(isDisabled){return}
            const onClick = (e) => directive(e, el, binding)
            const app = document.querySelector('[data-app]') ||
                document.body
            app.addEventListener('click', onClick, true)
            el._clickOutside = onClick
        },

        unbind (el) {
            if (!el._clickOutside) return
            const app = document.querySelector('[data-app]') ||
                document.body
            app && app.removeEventListener('click', el._clickOutside, true)
            delete el._clickOutside
        },
    }

}

export default ClickOutside