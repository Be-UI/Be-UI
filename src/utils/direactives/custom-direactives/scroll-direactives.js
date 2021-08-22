/*
* scroll-direactives.js
* @deprecated 滚动加载更多指令
* @author czh
* @create (czh 2021/4/14)
* @update (czh 2021/4/16)
*/
const scrollDirectives = {
    scroll:{
        bind(el, binding, vnode, oldVnode) {
             // 判断是否是select组建中的加载更多，用于获取实际滚动元素
            var isSelect = binding.arg === 'selects' ?  true : false;
            var p = 0;
            var t = 0;
            var down = true;
            // 增加 select组建 下拉内容 加载更多
            var selectWrap = isSelect ? el.querySelector('.el-select-dropdown .el-select-dropdown__wrap') : el;
            selectWrap.addEventListener("scroll", (e) => {
                p = selectWrap.scrollTop;
                // if ( t < p){down=true}else{down=false}
                if (t < p) {
                    down = true;
                } else {
                    down = false;
                }
                t = p;
                //判断是否到底
                const sign = 3;
                const scrollDistance = selectWrap.scrollHeight - selectWrap.scrollTop - selectWrap.clientHeight
                if (scrollDistance <= sign && down) {
                    binding.value()
                }
            });
        }
    }
}
export default scrollDirectives
