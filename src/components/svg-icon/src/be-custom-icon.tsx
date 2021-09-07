import { h, defineComponent, computed, mergeProps, PropType } from 'vue'

export const createCustom = (template:string) :object=>{
     return {
         name:'BeCustomIcon',
         props: {
             /**
              * 自定义宽
              */
             width: {
                 type: [Number, String],
                 default: 18
             },
             /**
              * 自定义高
              */
             height: {
                 type: [Number, String],
                 default: 18
             },
             /**
              * 定义颜色
              */
             color: {
                 type: String,
                 default: ''
             },
             /**
              * icon 名称
              */
             icon: {
                 type: String,
             },
             /**
              * 自定义样式类
              */
             customClass: {
                 type: String,
                 default: ''
             },
             /**
              * 是否旋转
              */
             spin: {
                 type: Boolean,
                 default: false
             }
         },
         render () {
             return h(
                 <div>
                     {template}
                 </div>
             )
         }
     }
};


/*export default defineComponent({
    name:'BeCustomIcon',
    props: {
        /!**
         * 自定义宽
         *!/
        width: {
            type: [Number, String],
            default: 18
        },
        /!**
         * 自定义高
         *!/
        height: {
            type: [Number, String],
            default: 18
        },
        /!**
         * 定义颜色
         *!/
        color: {
            type: String,
            default: ''
        },
        /!**
         * icon 名称
         *!/
        icon: {
            type: String,
        },
        /!**
         * 自定义样式类
         *!/
        customClass: {
            type: String,
            default: ''
        },
        /!**
         * 是否旋转
         *!/
        spin: {
            type: Boolean,
            default: false
        }
    },
    render () {
        return h(
           <span>123456</span>
        )
    }
})*/