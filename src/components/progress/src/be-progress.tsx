import {computed, defineComponent, getCurrentInstance,PropType} from "vue";
import {IProgressColor, IProgressInst, IProgressSuccess} from "./be-progress-type";
import {isObject} from '@vue/shared'
import {IOption} from "../../../utils/types";
export default defineComponent({
    name: 'BeProgress',
    props: {
        type: {
            type: String,
            default: 'line'
        },
        trailColor: {
            type: String,
            default: ''
        },
        color: {
            type: [String, Object] as PropType<IProgressColor>,
            default: ''
        },
        showInfo: {
            type: Boolean,
            default: true
        },
        percent: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: 'normal'
        },
        strokeLinecap:{
            type: String,
            default: 'round'// rect
        },
        strokeWidth:{
            type: Number,
            default: 10
        },
        success:{
            type: Object as PropType<IProgressSuccess>,
        }
    },
    setup(props, ctx) {

        // 當前實例
        const internalInstance = getCurrentInstance() as IProgressInst
        // 根据props 设置相关样式
        const innerStyleTypeLine = computed(()=>{
            const styleIns:IOption = {}
            // type="line"
            if(props.type === 'line'){
                if(isObject(props.color)){
                    styleIns.backgroundImage = `linear-gradient(to right, ${props.color.from} 0%, ${props.color.to} 100%)`
                }else{
                    styleIns.backgroundColor = props.color
                }
                styleIns.width = `${props.percent >= 100 ? 100 : props.percent}%`
                styleIns.height = `${props.strokeWidth}px`
                return styleIns
            }
            return {
                backgroundColor:props.color,
                width:`${props.percent}%`,
                height:`${props.strokeWidth}px`,
            }
        })
        /**
         * 超过一百显示为 success 的status
         */
        const innerStyleStatus = computed(()=>{
            if(props.percent >= 100){
                return 'success'
            }else{
                return props.status
            }
        })
        /**
         * 渲染success配置进度条部分
         */
        const renderSuccess = ():JSX.Element | undefined=>{
            if(isObject(props.success) && props.success.color && props.success.percent){
                return (
                    <div class={`
                                            be-progress-inner  
                                            be-progress-inner-suc  
                                            ${props.strokeLinecap === 'round' ? 'be-progress-inner__round' :''}  
                                            `}
                         style={innerStyleTypeLineSuccess.value}>
                    </div>
                )
            }
            return
        }
        /**
         * 设置success配置进度条部分样式
         */
        const innerStyleTypeLineSuccess = computed(()=>{
            const styleIns:IOption = {}
            // type="line"
            if(props.type === 'line'){
                styleIns.backgroundColor = props.success?.color
                styleIns.width = `${props.success?.percent! >= 100 ? 100 : props.success?.percent}%`
                styleIns.height = `${props.strokeWidth}px`
                return styleIns
            }
            return {
                backgroundColor:props.color,
                width:`${props.percent}%`,
                height:`${props.strokeWidth}px`,
            }
        })
        return () => {
            const rightRender = internalInstance.slots.default ? internalInstance.slots.default() : <span class='percent'>{`${props.percent}%`}</span>
            return (
                <div class='be-progress'>
                    {props.type === 'line' ?
                        (
                            <div class='be-progress-body'>
                                <div class={`
                                        be-progress-line
                                        ${props.strokeLinecap === 'round' ? 'be-progress-inner__round' :''}`}
                                     style={`background-color:${props.trailColor}`}>
                                    <div class={`
                                            be-progress-inner  
                                            ${props.strokeLinecap === 'round' ? 'be-progress-inner__round' :''}  
                                            be-progress-inner__${innerStyleStatus.value}`}
                                         style={innerStyleTypeLine.value}>
                                    </div>
                                    {/*
                                    传入了success配置时渲染
                                    分段success部分颜色不受color、status控制，根据percent的显示独立。100时也不用变色
                                    */}
                                    {renderSuccess()}
                                </div>
                                {/*slot - right*/}
                                {props.showInfo ? rightRender : ''}
                            </div>
                        )
                        : ''}
                </div>
            )
        }
    }
})