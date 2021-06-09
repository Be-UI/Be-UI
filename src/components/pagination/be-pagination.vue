/*
* @be-pagination.vue
* @deprecated 基于elementUI的分页公共组件（用于后台分页）
* @author czh  style="float: right"
* @update (czh 2021/4/21)
*/
<template>
    <div class="pagination-wrap" :class="customClass">
        <slot name="prev"></slot>
        <el-pagination
                @prev-click="prePage"
                @next-click="nextPage"
                @current-change='handleChangePage'
                @size-change="handleSizeChange"
                :disabled='isDisabled'
                background
                :current-page="currentPages"
                :page-size="pageSizes"
                :pager-count="5"
                :page-sizes="[10, 20, 50, 100]"
                :hide-on-single-page="false"
                :layout="'prev, pager, next'"
                class="pagination_c"
                :total="totals">
        </el-pagination>
        <slot name="next"></slot>
        <span class="pagesize-readonly" v-if="!isFront">{{pageSizes || 10}}条/页</span>
    </div>

</template>

<script>
    export default {
        name: 'BePagination',
        data() {
            return {
                sliceList: new Map(),
                totals: 0,
                pageSizes: 0,
                currentPages: 0
            }
        },
        props: {
            /**
             * 总数
             */
            total: {
                type: Number,
                default: 0
            },
            /**
             * 每页条数
             */
            pageSize: {
                type: Number,
                default: 0
            },
            /**
             * 当前页数
             */
            currentPage: {
                type: Number,
                default: 0
            },
            /**
             * 翻页方法（获取列表数据方法）
             */
            initFunc: {
                type: Function,
                default: Function
            },
            /**
             * 是否可以跳转到某页
             */
            isJump: {
                type: Boolean,
                default: true
            },
            /**
             * 翻页之前的页数
             */
            currentPage_h: {
                type: Number,
                default: 0
            },
            /**
             * 是否禁用
             */
            isDisabled: {
                type: Boolean,
                default: false
            },
            /**
             * 翻页方法的参数
             */
            params: {
                type: Object,
                default: null,
            },
            /**
             * 自定义主题样式类
             */
            customClass: [String , Object],
            /**
             * 是否启用前端分页
             */
            isFront: {
                type: Boolean,
                default: false,
            },
            /**
             * 前端分页-分页参数
             */
            pageParams: {
                type: Object,
                default: () => {
                    return {
                        pageSize: 5,// 每页条数
                        total: 0,
                        currentPage: 1,
                        pageCount: 1
                    }
                },
            }
        },
        computed: {},
        watch: {

            pageParams: {
                deep: true, //深度监听设置为 true
                handler: function (nVal) {
                    this.totals = nVal.total
                    this.pageSizes = nVal.pageSize
                    this.currentPages = nVal.currentPage
                }
            },
            total(nVal) {
                this.initPageParams()
            },
            pageSize(nVal) {
                this.initPageParams()
            },
            currentPage(nVal) {
                this.initPageParams()
            }
        },
        created() {
            this.initPageParams()
        },
        methods: {
            /**
             * 分页参数初始化
             */
            initPageParams() {
                if (!this.isFront) {
                    this.totals = this.total || this.pageParams.total
                    this.pageSizes = this.pageSize || this.pageParams.pageSize
                    this.currentPages = this.currentPage || this.pageParams.currentPage
                } else {
                    this.totals = this.pageParams.total
                    this.pageSizes = this.pageParams.pageSize
                    this.currentPages = this.pageParams.currentPage
                }
                this.$forceUpdate()
            },
            /**
             * 每页显示条数方法
             * @param {Number} pageSize - 显示的每页条数
             * @public
             */
            handleSizeChange(pageSize) {
                // 前端分页逻辑
                if (this.isFront) {
                    return
                }
                this.$emit("update:currentPage", 1);
                this.$emit("update:pageSize", pageSize);
                if (this.$listeners.initFunc) {
                    /**
                     * 翻页方法（获取列表数据方法）
                     * @event initFunc
                     * @param {Object} - 翻页获取列表参数(可选)
                     */
                    this.$emit('initFunc', this.params ? this.params : '')
                }
                this.params ? this.initFunc(this.params) : this.initFunc();
                this.setStore('pageSize', pageSize)
            },

            /********************** 前端分页方法 **********************/
            /**
             * 前台表格分页切片,一次性把数据切割分片缓存
             * @param {Object} tableData - 表格数据
             */
            sliceTableData(tableData) {
                let maxPageNum = Math.ceil(tableData.length / this.pageParams.pageSize)
                this.pageParams.pageCount = maxPageNum

                /*   this.totals = this.pageParams.total
                   this.pageSizes = this.pageParams.pageSize
                   this.currentPages = this.pageParams.currentPage
                */
                if (tableData.length === 0) {
                    this.sliceList.set(1, []);
                    this.pageParams.pageCount = 1;
                }
                for (let i = 1; i <= maxPageNum; i++) {
                    let slice = tableData.slice((i - 1) * this.pageParams.pageSize, i * this.pageParams.pageSize);
                    this.sliceList.set(i, slice)
                }
                this.initPageParams()
                return this.sliceList.get(1)
            },
            /**
             *上一页
             */
            prePage() {
                if (this.pageParams.currentPage !== 1 && this.pageParams.currentPage > 0 && this.isFront) {
                    let page = {...this.pageParams}
                    // 将翻页后的页码参数、切片表格数据传递到父组件
                    this.$emit("updatePage", {data: this.sliceList.get(--page.currentPage)});
                    this.$emit("update:pageParams", page);
                }
            },
            /**
             *下一页
             */
            nextPage() {
                if (this.pageParams.currentPage !== this.pageParams.pageCount && this.isFront) {
                    let page = JSON.parse(JSON.stringify(this.pageParams))
                    // 将翻页后的页码参数、切片表格数据传递到父组件
                    this.$emit("updatePage", {data: this.sliceList.get(++page.currentPage)});
                    this.$emit("update:pageParams", page);
                }
            },
            /**
             * 点击跳转页
             * @param {object} currentPage 当前点击页
             */
            handleChangePage(currentPage) {
                // 前端分页逻辑
                if (this.isFront) {
                    this.pageParams.currentPage = currentPage
                    let page = JSON.parse(JSON.stringify(this.pageParams))
                    this.$emit("update:pageParams", page);
                    this.$emit("updatePage", {data: this.sliceList.get(page.currentPage)});
                    return
                }
                // 兼容分页传参为currentPage等分开传的情况
                this.$emit("update:isDisabled", true);
                this.$emit("update:currentPage_h", this.currentPage);
                this.$emit("update:currentPage", currentPage);
                // 兼容分页传参为pageParams对象情况
                this.pageParams.currentPage = currentPage
                let page = JSON.parse(JSON.stringify(this.pageParams))
                this.$emit("update:pageParams", page);

                if (this.$listeners.initFunc) {
                    /**
                     * 翻页方法（获取列表数据方法）
                     * @event initFunc
                     * @param {Object} - 翻页获取列表参数(可选)
                     */
                    this.$emit('initFunc', this.params ? this.params : '')
                }
            },
        },
        mounted() {
        }
    }
</script>

<style scoped lang='scss'>
    .pagination_c {
        text-align: center;
        margin-top: 20px;
    }

    .pagination-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pagesize-readonly {
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        vertical-align: top;
        box-sizing: border-box;
        margin-top: 20px;
        color: #606266;
    }

    .pagination-right {
        float: right;
    }
</style>
<style lang="scss">
    .paginationN {
        .number:last-child {
            display: none;
        }
    }
</style>

