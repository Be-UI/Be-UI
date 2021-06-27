
export default {
    data() {
        return {
            sliceList:new Map(),
            pageParamsFront:{
                pageCount:0,
            },
            frontList:[]
        }
    },
    computed:{
        pageFrontData(){
            return this.pageData
        }
    },
    watch: {
        pageFrontData:{
            handler:function(nVal) {
                if(this.isFront){
                    let maxPageNum = Math.ceil(nVal.length / this.pageSize)
                    this.pageParamsFront.pageCount = maxPageNum

                    /*   this.totals = this.pageParams.total
                       this.pageSizes = this.pageParams.pageSize
                       this.currentPages = this.pageParams.currentPage
                    */
                    if (nVal.length === 0) {
                        this.sliceList.set(1, []);
                        this.pageParamsFront.pageCount = 1;
                    }
                    this.frontList = []
                    for (let i = 1; i <= maxPageNum; i++) {
                        let slice = nVal.slice((i - 1) * this.pageSize, i * this.pageSize);
                        this.sliceList.set(i, slice)
                        this.frontList.push(i)
                    }
                    //this.initPageParams()
                    this.$emit("updatePage", {data: this.sliceList.get(1)});
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
            if (this.currentPage !== this.pageCount && this.isFront) {
                let currentPage = this.currentPage
                // 将翻页后的页码参数、切片表格数据传递到父组件
                this.$emit("updatePage", {data: this.sliceList.get(++currentPage)});
            }
        },
    }
}