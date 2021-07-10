import Pager from './be-pager.vue';
export default {
    name: 'BePagination',
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
            default: 0
        },
        /**
         * 当前页
         */
        currentPage: Number,
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
        handleUpdatePage(data){
            this.$emit('updatePage',data)
        },
        handleChange(data){
            this.$emit('change',data)
        }
    },
    components:{
        Pager
    },
    render(h) {
        return (
            <div class="be-pager-container">
                <Pager {...{on: {updatePage: this.handleUpdatePage,change:this.handleChange}}}>
                </Pager>
            </div>
        );
    }
}