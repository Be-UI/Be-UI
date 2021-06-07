import paginationComponents from './be-pagination.vue';

const pagination = {
    install:function(Vue) {
        Vue.component('pagination', paginationComponents)
    }
}

export default pagination;