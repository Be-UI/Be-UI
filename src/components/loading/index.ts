/*
import {BeLoadingComp} from "./src/be-loading-service.ts";
import BeLoading from "./src/be-loading";
export default {
    install:function(Vue) {
        Vue.component(BeLoading.name, BeLoading);
    },
    instance:BeLoading,
    service:BeLoadingComp
};*/
import loading from "./src/be-loading-service";
import { App} from 'vue'
import {ILoading} from "./src/be-loading-type";
const load = loading as ILoading
/**
 * 组件装载方法
 * @param app
 */
load.install = (app:App): void => {
    app.component(load.name || '',load)
}
const BeLoading:ILoading = load
export default BeLoading;
export {BeLoading}