import paginationComponents from './src/be-pagination.js';

const pagination = {
    install:function(Vue) {
        Vue.component('be-pagination', paginationComponents)
    },
    service:paginationComponents
}

export default pagination;