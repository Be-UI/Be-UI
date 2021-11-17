import {Ref} from "vue";
import {IPageProvide} from "./be-pagenation-type";

/**
 * 计算常规分页列表数据
 * @param {Object} $$BePaginProps - provide/inject的 page Props
 * @param {Number} maxPageNum - 最大页码数
 * @param {Boolean} showPrevMore - 上页缩略显示标识
 * @param {Boolean} showNextMore - 下页缩略显示标识
 */
export const pagersList = ($$BePaginProps: IPageProvide, maxPageNum: Ref, showPrevMore: Ref, showNextMore: Ref) => {
    if ($$BePaginProps.isFront || $$BePaginProps.isDynamic) return []
    // 顯示的頁碼數量
    let pagerShowCount: number = $$BePaginProps.pagerShowCount;
    // 顯示的頁碼數量中位數，用於計算是否顯示上下縮略頁
    const halfPagerCount: number = (pagerShowCount - 1) / 2;
    // 數據縂條數
    const pageCount: number = Number($$BePaginProps.pageCount);
    // 最大頁數 = 數據縂條數/每頁顯示數量
    maxPageNum.value = Math.ceil(pageCount / Number($$BePaginProps.pageSize))
    // 計算當前頁碼，props的currentPage的當前頁碼 大於計算的最大頁數maxPageNum，則使用 maxPageNum ，否則用props的currentPage
    const currentPage: number = (Number($$BePaginProps.currentPage) > maxPageNum.value) ? maxPageNum.value : Number($$BePaginProps.currentPage);
    // 当數據縂條數 小於 用戶定義的顯示頁面數，則用數據縂條數，否則用顯示頁面數
    pagerShowCount = (maxPageNum.value <= pagerShowCount) ? maxPageNum.value : pagerShowCount;
    // 上下縮略也 顯示標識
    let showPrevMoreIner: boolean = false;
    let showNextMoreIner: boolean = false;
    // 根据页数和显示页数，判断是否显示翻页缩略
    if (maxPageNum.value > pagerShowCount) {
        // 當前頁碼 大於 （顯示的頁碼數量 - 顯示的頁碼數量中位數） 顯示上頁縮略翻頁
        if (currentPage > pagerShowCount - halfPagerCount) {
            showPrevMoreIner = true;
        }
        // 當前頁碼 小於 （最大頁數 - 顯示的頁碼數量中位數 + 2） 因爲首頁和末頁用永遠顯示，所以加2
        if (currentPage < maxPageNum.value - (pagerShowCount - 2)) {
            showNextMoreIner = true;
        }
    }
    // 根据 showNextMoreIner 和 showPrevMoreIner 也就是上下页缩略翻页的现实情况
    // 设置生成页码列表，循环渲染，值得注意的是第一页和最后一页永远都是显示的
    const array: Array<number> = [];
    // 只显示上页缩略翻页
    if (showPrevMoreIner && !showNextMoreIner) {
        const startPage: number = maxPageNum.value - (pagerShowCount - 2);
        for (let i: number = startPage; i < maxPageNum.value; i++) {
            array.push(i);
        }
    } // 只显示下页缩略翻页 或 都不显示时，pagerCount的有效参数必须大于2
    else if ((!showPrevMoreIner && showNextMoreIner) || (!showPrevMoreIner && !showNextMoreIner)) {
        // i 从2开始，刚好排除了第一页和最后一页永远都是显示的次数
        for (let i: number = 2; i < pagerShowCount; i++) {
            array.push(i);
        }
    }  // 上下页缩略翻页都显示时，渲染范围根据当前页，前后各偏移2，1
    else if (showPrevMoreIner && showNextMoreIner) {
        // 上下页缩略翻页都显示时，渲染范围根据当前页，前后各偏移2，1
        const offset: number = Math.floor(pagerShowCount / 2) - 1;
        for (let i: number = currentPage - offset; i < currentPage + offset + 1; i++) {
            array.push(i);
        }
    }
    showPrevMore.value = showPrevMoreIner;
    showNextMore.value = showNextMoreIner;
    return array;
}
