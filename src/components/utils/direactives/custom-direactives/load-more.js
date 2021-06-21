/*
* load-more.js
* @deprecated elementUI 表格 滚动加载指令
* @author czh
* @create (czh 2021/4/29)
* @update (czh 2021/4/29)
*/
const loadMoreDirectives = {
    loadmore: {
        // 指令的定义
        bind(el, binding, vnode) {
            const selectWrap = el
            selectWrap.addEventListener('scroll', function() {
                const sign = 100
                const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
                if (scrollDistance <= sign) {
                    binding.value(binding.arg)
                }
            })
        }
    }
}
export default loadMoreDirectives

