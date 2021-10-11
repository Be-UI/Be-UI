import { computed } from "vue";
export const pagersList = ($$BePaginProps,maxPageNum,showPrevMore,showNextMore)=>{
  return computed(()=>{
    let pagerCount:number = $$BePaginProps.pagerShowCount;// 顯示的頁碼數量
    const halfPagerCount:number = (pagerCount - 1) / 2;
    const pageCount:number = Number($$BePaginProps.pageCount);// 數據縂條數
    maxPageNum.value = Math.ceil(pageCount / Number($$BePaginProps.pageSize))// 最大頁數
    const currentPage:number = (Number($$BePaginProps.currentPage) > maxPageNum.value) ? maxPageNum.value : Number($$BePaginProps.currentPage);// 當前頁碼
    // 当小于用户定义的显示页数 大于 用户总页数和显示数计算出来的总页数时，使用计算的总页数
    pagerCount = (pageCount <= pagerCount)  ? pageCount : pagerCount;
    let showPrevMoreIner:boolean = false;
    let showNextMoreIner:boolean = false;
    // 根据页数和显示页数，判断是否显示翻页缩略
    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - halfPagerCount ) {
        showPrevMoreIner = true;
      }
      if (currentPage < pageCount - halfPagerCount && currentPage < maxPageNum.value - (pagerCount - 2)) {
        showNextMoreIner = true;
      }
    }
    // 根据 showNextMoreIner 和 showPrevMoreIner 也就是上下页缩略翻页的现实情况
    // 设置生成页码列表，循环渲染，值得注意的是第一页和最后一页永远都是显示的
    const array:Array<number> = [];
    if (showPrevMoreIner && !showNextMoreIner) {
      // 只显示上页缩略翻页
      const startPage:number = maxPageNum.value - (pagerCount - 2);
      for (let i = startPage; i < maxPageNum.value; i++) {
        array.push(i);
      }
    } else if ((!showPrevMoreIner && showNextMoreIner) || (!showPrevMoreIner && !showNextMoreIner)) {
      // 只显示下页缩略翻页 或 都不显示时，pagerCount的有效参数必须大于2
      // i 从2开始，刚好排除了第一页和最后一页永远都是显示的次数
      for (let i = 2; i < pagerCount ; i++) {
        array.push(i);
      }
    } else if (showPrevMoreIner && showNextMoreIner) {
      // 上下页缩略翻页都显示时，渲染范围根据当前页，前后各偏移2，1
      const offset:number = Math.floor(pagerCount / 2) - 1;
      for (let i = currentPage - offset; i < currentPage + offset + 1; i++) {
        array.push(i);
      }

    }
    showPrevMore.value = showPrevMoreIner;
    showNextMore.value = showNextMoreIner;

    return array;
  })
}
