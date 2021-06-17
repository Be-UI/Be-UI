import {BeLoading} from "./src/be-loading-service.js";
export default {
    install:function(Vue) {
        Vue.component(BeLoading.name, BeLoading);
    },
    service:BeLoading
};