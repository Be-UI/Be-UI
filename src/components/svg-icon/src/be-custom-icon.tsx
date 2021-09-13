import { h, defineComponent, computed, mergeProps, PropType } from 'vue'

export const createCustom = (template:string) :object=>{
     return {
         name:'BeCustomIcon',
         props: {
             /**
              * 是否旋转
              */
             spin: {
                 type: Boolean,
                 default: false
             }
         },
         setup(props:any) {
             const customClass = props.customClass ? props.customClass :''
             const spinClass = computed(() => props.spin ? 'be-icon-spin ' + customClass: '' + customClass)
             return {
                 spinClass
             }
         },
         render () {
             return h(
                 <div class={`be-icon-container ${this.spinClass}`} {...this.$attrs}>
                    {template}
                </div>

             )
         }
     }
};
