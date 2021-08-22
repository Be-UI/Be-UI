import type { App } from 'vue';
// 按需引用
export * from './install-components';
/*export * from './plugins';
export * from './composables';*/

import * as components from './install-components';
const componentList:object = components
export const install = function (app: App) {
    Object.keys(componentList).forEach((key: string) => {
        const component = componentList[key];
        if (component.install) {
            app.use(component);
        }
    });
    return app;
};
const version:string = '3.0.0-beta1.0'
export { version };
export default {
    version,
    install,
};

