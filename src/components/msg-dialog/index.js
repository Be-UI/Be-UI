import msgDialogComponents from './be-msg-dialog.vue';

const beMsgDialog = {
    install:function(Vue) {
        Vue.component('BeMsgDialog', msgDialogComponents)
    }
}

export default beMsgDialog;