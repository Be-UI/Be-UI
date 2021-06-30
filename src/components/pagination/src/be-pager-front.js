
export default {
    data() {
        return {
            // 分页切片
            sliceList:new Map(),
            // 前端分页参数
            pageParamsFront:{
                pageCount:0,
            },

            frontList:[]
        }
    },
    computed:{
        pageFrontData(){
            let maxPageNum = Math.ceil(this.pageData.length / this.pageSize)
            this.pageParamsFront.pageCount = maxPageNum

            if (this.pageData.length === 0) {
                this.sliceList.set(1, []);
                this.pageParamsFront.pageCount = 1;
            }
            for (let i = 1; i <= maxPageNum; i++) {
                let slice = this.pageData.slice((i - 1) * this.pageSize, i * this.pageSize);
                this.sliceList.set(i, slice)
            }
            const pagerCount = this.pagerShowCount;
            const halfPagerCount = (pagerCount - 1) / 2;
            const currentPage = Number(this.currentPage);

            let showPrevMore = false;
            let showNextMore = false;
            // 根据页数和显示页数，判断是否显示翻页缩略
            if (maxPageNum > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }
                if (currentPage < maxPageNum - halfPagerCount) {
                    showNextMore = true;
                }
            }
            // 根据 showNextMore 和 showPrevMore 也就是上下页缩略翻页的现实情况
            // 设置生成页码列表，循环渲染，值得注意的是第一页和最后一页永远都是显示的
            const array = [];
            if (showPrevMore && !showNextMore) {
                // 只显示上页缩略翻页
                const startPage = maxPageNum - (pagerCount - 2);
                for (let i = startPage; i < maxPageNum; i++) {
                    array.push(i);
                }
            } else if ((!showPrevMore && showNextMore) || (!showPrevMore && !showNextMore)) {
                // 只显示下页缩略翻页或都不显示时，pagerCount的有效参数必须大于2
                // i 从2开始，刚好排除了第一页和最后一页永远都是显示的次数
                for (let i = 2; i < pagerCount ; i++) {
                    array.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                // 上下页缩略翻页都显示时，渲染范围根据当前页，前后各偏移
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset; i < currentPage + offset; i++) {
                    array.push(i);
                }
            }
            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;
            return array
        }
    },
    watch: {
        /**
         * 前台表格分页切片,一次性把数据切割分片缓存
         */
        pageFrontData:{
            handler:function(nVal) {
                if(this.isFront && nVal.length > 0){
                    this.frontList = nVal
                }
            },
            immediate: true
        }
    },
    methods:{
        /**
         * 分页参数初始化
         */
        initPageParams() {
            this.totals = this.pageParams.total
            this.pageSizes = this.pageParams.pageSize
            this.currentPages = this.pageParams.currentPage
            this.$forceUpdate()
        },
        /**
         * 前台表格分页切片,一次性把数据切割分片缓存
         * @param {Object} tableData - 表格数据
         */
        /*sliceTableData(tableData) {
            let maxPageNum = Math.ceil(tableData.length / this.pageParams.pageSize)
            this.pageParams.pageCount = maxPageNum

            /!*   this.totals = this.pageParams.total
               this.pageSizes = this.pageParams.pageSize
               this.currentPages = this.pageParams.currentPage
            *!/
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
        },*/
        /**
         *上一页
         */
        prePageFront() {
            if (this.currentPage !== 1 && this.currentPage > 0 && this.isFront) {
                let currentPage = this.currentPage
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(--currentPage)});
            }
        },
        /**
         *下一页
         */
        nextPageFront() {
            if (this.currentPage !== this.pageParamsFront.pageCount && this.isFront) {
                let currentPage = this.currentPage
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(++currentPage)});
            }
        },
    }
}