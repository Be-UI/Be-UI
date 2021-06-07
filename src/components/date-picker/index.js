import datePickerComponents from './be-date-picker.vue';

const datePicker = {
    install:function(Vue) {
        Vue.component('datePicker', datePickerComponents)
    }
}

export default datePicker;