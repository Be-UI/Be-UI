
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
            const pageSize = this.$$BePagination.pageNumVal ? Number(this.$$BePagination.pageNumVal.split('/')[0]) : this.$$BePagination.pageSize
            this.maxPageNum = Math.ceil(this.$$BePagination.pageData.length / pageSize)
            this.pageParamsFront.pageCount = this.maxPageNum

            if (this.$$BePagination.pageData.length === 0) {
                this.sliceList.set(1, []);
                this.pageParamsFront.pageCount = 1;
            }
            this.$emit('getPageCount',this.pageParamsFront)
            for (let i = 1; i <= this.maxPageNum; i++) {
                let slice = this.$$BePagination.pageData.slice((i - 1) * pageSize, i * pageSize);
                this.sliceList.set(i, slice)
            }
            let pagerCount = this.$$BePagination.pagerShowCount;
            // 当小于用户定义的显示页数 大于 用户总页数和显示数计算出来的总页数时，使用计算的总页数
            pagerCount = this.maxPageNum < pagerCount ? this.maxPageNum : pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;
            const currentPage = Number(this.$$BePagination.currentPage) > this.maxPageNum ? this.maxPageNum : Number(this.$$BePagination.currentPage);
            let showPrevMore = false;
            let showNextMore = false;
            // 根据页数和显示页数，判断是否显示翻页缩略
            if (this.maxPageNum > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }
                if (currentPage < this.maxPageNum - halfPagerCount) {
                    showNextMore = true;
                }
            }
            // 根据 showNextMore 和 showPrevMore 也就是上下页缩略翻页的现实情况
            // 设置生成页码列表，循环渲染，值得注意的是第一页和最后一页永远都是显示的
            const array = [];
            if (showPrevMore && !showNextMore) {
                // 只显示上页缩略翻页
                const startPage = this.maxPageNum - (pagerCount - 2);
                for (let i = startPage; i < this.maxPageNum; i++) {
                    array.push(i);
                }
            } else if ((!showPrevMore && showNextMore) || (!showPrevMore && !showNextMore)) {
                // 只显示下页缩略翻页或都不显示时，pagerCount的有效参数必须大于2
                // i 从2开始，刚好排除了第一页和最后一页永远都是显示的次数
                for (let i = 2; i < pagerCount ; i++) {
                    array.push(i);
                }
                debugger
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
                console.log(nVal)
                if(this.$$BePagination.isFront){
                    this.frontList = nVal
                }
            },
            immediate: true
        }
    },
    methods:{
        /**
         *上一页
         */
        prePageFront() {
            let currentPage = Number(this.$$BePagination.currentPage) > this.maxPageNum ? this.maxPageNum : Number(this.$$BePagination.currentPage);
            if (currentPage !== 1 && currentPage > 0 && this.$$BePagination.isFront) {
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(--currentPage)});
            }
        },
        /**
         *下一页
         */
        nextPageFront() {
            let currentPage = Number(this.$$BePagination.currentPage) > this.maxPageNum ? this.maxPageNum : Number(this.$$BePagination.currentPage);
            if (currentPage !== this.pageParamsFront.pageCount && this.$$BePagination.isFront) {
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(++currentPage)});
            }
        },
    }
}