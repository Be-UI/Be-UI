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
             const spinClass = computed(() => props.spin ? 'be-icon-spin ' + props.customClass: '' + props.customClass)
             return {
                 spinClass
             }
         },
         render () {
             debugger
             return h(
                 <div class={`be-icon-container ${this.spinClass}`}>
                    {template}
                </div>

             )
         }
     }
};
