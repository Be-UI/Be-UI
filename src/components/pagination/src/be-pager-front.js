
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
            let maxPageNum = Math.ceil(this.$$BePagination.pageData.length / this.$$BePagination.pageSize)
            this.pageParamsFront.pageCount = maxPageNum

            if (this.$$BePagination.pageData.length === 0) {
                this.sliceList.set(1, []);
                this.pageParamsFront.pageCount = 1;
            }
            for (let i = 1; i <= maxPageNum; i++) {
                let slice = this.$$BePagination.pageData.slice((i - 1) * this.$$BePagination.pageSize, i * this.$$BePagination.pageSize);
                this.sliceList.set(i, slice)
            }
            const pagerCount = this.$$BePagination.pagerShowCount;
            const halfPagerCount = (pagerCount - 1) / 2;
            const currentPage = Number(this.$$BePagination.currentPage);

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
                if(this.$$BePagination.isFront && nVal.length > 0){
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
            if (this.$$BePagination.currentPage !== 1 && this.$$BePagination.currentPage > 0 && this.$$BePagination.isFront) {
                let currentPage = this.$$BePagination.currentPage
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(--currentPage)});
            }
        },
        /**
         *下一页
         */
        nextPageFront() {
            if (this.$$BePagination.currentPage !== this.pageParamsFront.pageCount && this.$$BePagination.isFront) {
                let currentPage = this.$$BePagination.currentPage
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(++currentPage)});
            }
        },
    }
}