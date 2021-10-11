import { computed ,watchEffect,watch,reactive} from "vue";
export const pagerFront = ($$BePaginProps,$$BePaginMix,maxPageNum,showPrev,showNext,inst:any) =>{
    // 分页切片
    const sliceList = reactive(new Map())
    // 前端分页参数
   /* const pageParamsFront = reactive({
        pageCount:0,
    })*/
    let frontList = reactive([])
    const pageFrontData = computed(()=>{
        const pageSize = $$BePaginMix.pageNumVal ? Number($$BePaginMix.pageNumVal.split('/')[0]) : $$BePaginProps.pageSize
        maxPageNum = Math.ceil($$BePaginProps.pageData.length / pageSize)
        $$BePaginMix.pageParamsFront.pageCount = maxPageNum

        if ($$BePaginProps.pageData.length === 0) {
            sliceList.set(1, []);
            $$BePaginMix.pageParamsFront.pageCount = 1;
        }
        inst.emit('getPageCount',$$BePaginMix.pageParamsFront)
        for (let i = 1; i <= maxPageNum; i++) {
            let slice = $$BePaginProps.pageData.slice((i - 1) * pageSize, i * pageSize);
            sliceList.set(i, slice)
        }
        let pagerCount = $$BePaginProps.pagerShowCount;
        // 当小于用户定义的显示页数 大于 用户总页数和显示数计算出来的总页数时，使用计算的总页数
        pagerCount = maxPageNum < pagerCount ? maxPageNum : pagerCount;
        const halfPagerCount = (pagerCount - 1) / 2;
        const currentPage = Number($$BePaginProps.currentPage) > maxPageNum ? maxPageNum : Number($$BePaginProps.currentPage);
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
        showPrev = showPrevMore;
        showNext = showNextMore;
        return array
    })
    watchEffect(()=>{
        if($$BePaginProps.isFront){
            frontList = pageFrontData
        }
    })
    watch(pageFrontData,(val)=>{
        if($$BePaginProps.isFront){
            frontList = val
        }
    })
    /**
     *上一页
     */
    const prePageFront = ():void => {
        let currentPage = Number($$BePaginProps.currentPage) > maxPageNum ? maxPageNum : Number($$BePaginProps.currentPage);
        if (currentPage !== 1 && currentPage > 0 && $$BePaginProps.isFront) {
            // 将翻页后的页码参数、切片表格数据传递到父组件
            inst.emit("updatePage", {data: sliceList.get(--currentPage)});
        }
    }
    /**
     *下一页
     */
    const nextPageFront = ():void => {
        let currentPage = Number($$BePaginProps.currentPage) > maxPageNum ? maxPageNum : Number($$BePaginProps.currentPage);
        if (currentPage !== $$BePaginMix.pageParamsFront.pageCount && $$BePaginProps.isFront) {
            // 将翻页后的页码参数、切片表格数据传递到父组件
            inst.emit("updatePage", {data: sliceList.get(++currentPage)});
        }
    }
    return{
        sliceList,
        frontList,
        prePageFront,
        nextPageFront,
    }
}
/*
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
            const pageSize = $$BePagination.pageNumVal ? Number($$BePagination.pageNumVal.split('/')[0]) : $$BePagination.pageSize
            maxPageNum = Math.ceil($$BePagination.pageData.length / pageSize)
            $$BePagination.pageParamsFront.pageCount = maxPageNum

            if ($$BePagination.pageData.length === 0) {
                sliceList.set(1, []);
                $$BePagination.pageParamsFront.pageCount = 1;
            }
            inst.emit('getPageCount',pageParamsFront)
            for (let i = 1; i <= maxPageNum; i++) {
                let slice = $$BePagination.pageData.slice((i - 1) * pageSize, i * pageSize);
                sliceList.set(i, slice)
            }
            let pagerCount = $$BePagination.pagerShowCount;
            // 当小于用户定义的显示页数 大于 用户总页数和显示数计算出来的总页数时，使用计算的总页数
            pagerCount = maxPageNum < pagerCount ? maxPageNum : pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;
            const currentPage = Number($$BePagination.currentPage) > maxPageNum ? maxPageNum : Number($$BePagination.currentPage);
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
            showPrevMore = showPrevMore;
            showNextMore = showNextMore;
            return array
        }
    },
    watch: {
        /!**
         * 前台表格分页切片,一次性把数据切割分片缓存
         *!/
        pageFrontData:{
            handler:function(nVal) {
                if($$BePagination.isFront){
                    frontList = nVal
                }
            },
            immediate: true
        }
    },
    methods:{
        /!**
         *上一页
         *!/
        prePageFront() {
            let currentPage = Number($$BePagination.currentPage) > maxPageNum ? maxPageNum : Number($$BePagination.currentPage);
            if (currentPage !== 1 && currentPage > 0 && $$BePagination.isFront) {
                // 将翻页后的页码参数、切片表格数据传递到父组件
                inst.emit("updatePage", {data: sliceList.get(--currentPage)});
            }
        },
        /!**
         *下一页
         *!/
        nextPageFront() {
            let currentPage = Number($$BePagination.currentPage) > maxPageNum ? maxPageNum : Number($$BePagination.currentPage);
            if (currentPage !== $$BePagination.pageParamsFront.pageCount && $$BePagination.isFront) {
                // 将翻页后的页码参数、切片表格数据传递到父组件
                inst.emit("updatePage", {data: sliceList.get(++currentPage)});
            }
        },
    }
}*/
