import {computed, defineComponent, getCurrentInstance, onMounted, ref} from "vue";
import {ISwitchInst} from "../../switch/src/be-switch-type";
import {isBool, isNumber, isString} from "../../../utils/common";

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
            type: String,
            default: ''
        },
        showInfo: {
            type: Boolean,
            default: true
        },
        percent: {
            type: Number,
            default: 35
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
            default: 50
        },
    },
    setup(props, ctx) {

        // 當前實例
        const internalInstance = getCurrentInstance() as ISwitchInst
        const innerStyleTypeLine = computed(()=>{
            if(props.type === 'line'){
                return {
                    backgroundColor:props.color,
                    width:`${props.percent >= 100 ? 100 : props.percent}%`,
                    height:`${props.strokeWidth}px`,
                }
            }
            return {
                backgroundColor:props.color,
                width:`${props.percent}%`,
                height:`${props.strokeWidth}px`,
            }
        })
        const innerStyleStatus = computed(()=>{
            if(props.percent >= 100){
                return 'success'
            }else{
                return props.status
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