import Pager from './be-pager.vue';
import beInput from '../../input/be-input.vue';
import '../../../assets/style/be-pager.scss';
import {getUuid} from '../../../utils/common/common'
/**
 * 页码信息组件
 * @param h
 * @return {JSX.Element}
 */
const pageInfoComponent = function (h){
    const total = this.isFront ? this.pageParamsFront.pageCount : this.pageCount
    return (
        <span class = 'be-pager-info'>第{this.currentPage >total ? total : this.currentPage }页/共{total}页</span>
    )
}
/**
 * 页码跳转组件
 * @param h
 * @return {JSX.Element}
 */
const pageJumpComponent = function (h){
    const disabled = this.disabled ? true : this.disabledJump ? true : false
    return (
        <div class = 'be-pager-jump'>
            跳至<input
                     disabled={disabled}
                     class = 'be-pager-jump-input'
                     type='text'
                     value={this.jumpPage}
                     onkeyup={this.handleEnterEvn}/>页
        </div>
    )
}
export default {
    name: 'BePagination',
    data(){
        return {
            jumpPage:'',
            pageParamsFront:{
                pageCount:0
            },
            // 每页显示数量
            pageNumVal:'',
        }
    },
    //把当前组件实例上下文传递给子组件使用
    provide() {
        return {
            $$BePagination: this,
        }
    },
    props: {
        /**
         * 每页条数
         */
        pageSize: {
            type: Number,
            default: 1,
            validator: function(value){
                return value <= 0 ? 1 : value;
            }
        },
        /**
         * 当前页
         */
        currentPage: {
            type: Number,
            default: 1,
            validator: function(value){
                return value <= 0 ? 1 : value;
            }
        },
        /**
         * 总页数
         */
        pageCount: Number,
        /**
         * 页数过多时，显示的页数
         * 例如3 则显示第一第二和最后页
         * 参数有效必须大于2
         * 当传入isDynamic 动态分页时，此值则是动态分页最大显示数量
         */
        pagerShowCount: Number,
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
         * 是否开启前端分页
         */
        isFront: {
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
        }
    },
    methods:{
        /**
         * 分页跳转方法
         * @param {Number | String} value - 跳转页码
         * @public
         */
        jumpTo(value){
            this.$refs.pager.onPagerClick(null,value)
        },
        /**
         * 分页参数传递方法
         * @param {Event} e - 输入事件
         */
        handleEnterEvn(e){
            if(e.key === 'Enter'){
                const total = this.isFront ? this.pageParamsFront.pageCount : this.pageCount
                const value = e.target.value
                // 只处理小于最大页码的正整数
                if(/^\d+$/.test(value) && Number(value) <= total){
                    this.jumpTo(value)
                }else{
                    e.target.value = ''
                }
            }
        },
        /**
         * 前端分页数据传递方法
         * @param {Object} data - 分页数据
         */
        handleUpdatePage(data){
            this.$emit('updatePage',data)
        },
        /**
         * 分页参数传递方法
         * @param {Object} data - 分页参数
         */
        handleChange(data){
            this.$emit('change',data)
        },
        /**
         * 前端分页数据更新
         * @param {Object} data - 分页参数
         */
        getPageCount(data){
            this.pageParamsFront = data
        },
        /**
         * 生成每页显示数量设置列表
         * @param {Function} cb - input-select的回调方法
         */
        createPageNumList(data,cb){
            let list = []
            const total = parseInt((this.isFront ? this.pageData.length : this.pageCount)/10) * 10
            for(let i = 10; i<= total;i = i + 10){
                list.push({label:i,id:getUuid()})
            }
            cb(list,'label','id')
        },
        /**
         * 获取每页显示数量设置类别的选择结果
         * @param {Object} data - 页面设置数据
         * @public
         */
        getPageNum(data){
            this.pageNumVal = data.label + '/页'
            this.$emit('updateNum',data.label)
        }
    },
    components:{
        Pager,
        beInput
    },
    created(){
        this.pageNumVal = this.pageSize + '/页' //disabled
    },
    render(h) {
        return (
            <div class="be-pager-container">
                <Pager ref='pager' {...{on: {updatePage: this.handleUpdatePage,change:this.handleChange,getPageCount:this.getPageCount}}}>
                </Pager>
                {pageJumpComponent.call(this,h)}
                {pageInfoComponent.call(this,h)}
                <be-input v-model={this.pageNumVal}
                          readonly
                          custom-class={'be-pager-select'}
                          fetch-suggestions= {this.createPageNumList}
                          {...{on: {select: this.getPageNum}}}
                        ></be-input>
            </div>
        );
    }
}