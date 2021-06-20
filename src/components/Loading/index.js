import {BeLoadingComp} from "./src/be-loading-service.js";
import BeLoading from "./src/be-loading";
export default {
    install:function(Vue) {
        Vue.component(BeLoading.name, BeLoading);
    },
    instance:BeLoading,
    service:BeLoadingComp
};