import Pager from './be-pager.vue';
//import beInput from '../../input/be-input.vue';
import '../../../assets/style/be-pager.scss';
import {getUuid} from "../../../utils/common"
import {
    defineComponent,
    getCurrentInstance,
    provide,
    ref, computed, onMounted, onUnmounted, watchEffect, watch, reactive
} from "vue";

export default defineComponent({
    name: 'BePagination',
    components:{
        Pager,
        //beInput
    },
    props: {
        /**
         * 每页条数
         */
        pageSize: {
            type: Number,
            default:5,
            validator:(value:number):boolean=>{
                return value <= 0 ? false : true
            }
        },
        /**
         * 当前页
         */
        currentPage: {
            type: Number,
            default:1,
            validator:(value:number):boolean=>{
                return value <= 0 ? false : true
            }
        },
        /**
         * 总數據数
         */
        pageCount: {
            type:Number,
        },
        /**
         * 页数过多时，显示的页数
         * 例如3 则显示第一第二和最后页
         * 参数有效必须大于2
         * 当传入isDynamic 动态分页时，此值则是动态分页最大显示数量
         */
        pagerShowCount: {
            type: Number,
            validator: (value: number): boolean => {
                return value > 2 ? true : false
            }
        },
        /**
         * 是否禁用
         */
        disabled: Boolean,
        /**
         * 是否禁用输入跳转
         */
        disabledJump: Boolean,
        /**
         * 是否开启动态分页
         * 开启后类似于百度分页
         * 适用于分页总页数未知或动态变化场景
         */
        isDynamic: {
            type: Boolean,
            default: false,
        },
        /**
         * 前端分页数据，开启前端分页后，会针对这些数据进行切片
         * 每翻页，则会返回对于页数据
         */
        pageData:{
            type: Array,
            default: ()=>[],
        },
        /**
         * 自定义布局
         * ['page','jump','info','pNum','prev','next']
         */
        layout:{
            type: Array,
            default: ()=>['page','jump','info'],
        },
        /**
         * 是否开启前端分页
         */
        isFront: {
            type: Boolean,
            default: false,
        },
    },
    setup(props,ctx){
        let jumpPage = ref('')
        const curInst = getCurrentInstance()
        console.log(curInst)
        let pageParamsFront = reactive({pageCount:0})
        // 每页显示数量
        let pageNumVal = ref('')
        /**
         * 分页跳转方法
         * @param {Number | String} value - 跳转页码
         * @public
         */
        const jumpTo = (value:number | string):void => {
            curInst.refs.pager.onPagerClick(null,value)
        }

        // 坑，直接把props给provide，放到对象里会失去响应式
        provide('$$BePaginProps', props)
        let pagerMix = reactive({
            jumpPage:jumpPage.value,
            pageParamsFront:pageParamsFront,
            pageNumVal:pageNumVal.value
        })
        provide('$$BePaginMix',pagerMix)



        /**
         * 分页参数传递方法
         * @param {KeyboardEvent} e - 输入事件
         */
        const handleEnterEvn = (e:KeyboardEvent):void =>{
            if(e.key === 'Enter' && e.target !== null){
                const pageCount:number = props.pageCount ? props.pageCount : 0
                const maxPageNum = Math.ceil(pageCount / Number(props.pageSize))
                const total = props.isFront ? pageParamsFront.pageCount : maxPageNum
                const value:string = (e.target as HTMLInputElement).value
                // 只处理小于最大页码的正整数
                if(/^\d+$/.test(value) && Number(value) <= total){
                    jumpTo(value)
                }else{
                    (e.target as HTMLInputElement).value = ''
                    debugger
                }
            }
        }
        /**
         * 前端分页数据传递方法
         * @param {Object} data - 分页数据
         */
        const handleUpdatePage = (data:any):void =>{
            ctx.emit('updatePage',data)
        }
        /**
         * 分页参数传递方法
         * @param {Object} data - 分页参数
         */
        const handleChange = (data:any):void =>{
             ctx.emit('changePage',data)
        }
        /**
         * 前端分页数据更新
         * @param {Object} data - 分页参数
         */
         const getPageCount = (data:any):void =>{
            pageParamsFront = data
        }
        /**
         * 生成每页显示数量设置列表
         * @param {Function} cb - input-select的回调方法
         */
        const createPageNumList = (data:any,cb:Function):void=>{
            let list:Array<any> = []
            const pageCount:number = props.pageCount ? props.pageCount : 0
            const total = parseInt(String((props.isFront ? props.pageData.length : pageCount) / 10)) * 10
            for(let i = 10; i<= total;i = i + 10){
                list.push({label:i,id:getUuid()})
            }
            cb(list,'label','id')
        }
        /**
         * 获取每页显示数量设置类别的选择结果
         * @param {Object} data - 页面设置数据
         * @public
         */
        const getPageNum = (data:any):void=>{
           pageNumVal.value = data.label + '/页'
            ctx.emit('updateNum',data.label)
        }
        /**
         * 页码信息组件
         * @return {JSX.Element | undefined}
         */
        const pageInfoComponent =  ():JSX.Element | undefined =>{
            if(props.isDynamic){return}
            const pageCount:number = props.pageCount ? props.pageCount : 0
            const maxPageNum = Math.ceil(pageCount / Number(props.pageSize))
            const total = props.isFront ? pageParamsFront.pageCount : maxPageNum
            return (
                <span class = 'be-pager-info'>第{props.currentPage > total ? total : props.currentPage }页/共{total}页</span>
            )
        }
        /**
         * 页码跳转组件
         * @return {JSX.Element}
         */
        const pageJumpComponent =  ():JSX.Element | undefined => {
            const disabled = props.disabled ? true : (props.disabledJump ? true : false)
            return (
                <div class = 'be-pager-jump'>
                    跳至<input
                    disabled={disabled}
                    class = 'be-pager-jump-input'
                    type='text'
                    value={jumpPage.value}
                    onKeyup={handleEnterEvn}/>页
                </div>
            )
        }
        onMounted(()=>{
           pageNumVal.value = props.pageSize + '/页' //disabled
        })
        return ()=>{
            // 定义布局渲染列表
            let renderLsit = {
                page:(<Pager ref='pager' {...{onUpdatePage: handleUpdatePage,onChangePage:handleChange,onGetPageCount:getPageCount}}>
                </Pager>),
                jump:pageJumpComponent.call(this),
                info:pageInfoComponent.call(this),
               /* next:this.$scopedSlots.next(),
                prev:this.$scopedSlots.prev()*/
            }
            // 分动态布局才支持页面数量显示设置
            /*if(!this.isDynamic){
                renderLsit.pNum = (<be-input v-model={this.pageNumVal}
                                            readonly
                                            custom-class={'be-pager-select'}
                                            fetch-suggestions= {this.createPageNumList}
                                            {...{on: {select: this.getPageNum}}}></be-input>)
            }*/
            return (
                <div class="be-pager-container">
                    {/*根据渲染布局props渲染renderList，实现自定义布局*/}
                    {props.layout.map((v:any) => {
                    return  Object(renderLsit)[v]
                })}
                </div>
            )
        }
    }

})