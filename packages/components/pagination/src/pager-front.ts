import { computed, unref } from 'vue'
import type { Ref } from 'vue'
import type { IPageProvide, IPagerMix, IPagesFront } from './be-pagination-type'

/**
 * 前端分页处理计算
 * @param $$BePaginProps - provide/inject的 page Props
 * @param $$BePaginMix - provide/inject的 page $$BePaginMix
 * @param maxPageNum - 最大页码数
 * @param showPrev - 上页缩略显示标识
 * @param showNext - 下页缩略显示标识
 * @param inst 组件上下文
 */
export const pagerFront = (
  $$BePaginProps: IPageProvide,
  $$BePaginMix: IPagerMix,
  maxPageNum: Ref,
  showPrev: Ref,
  showNext: Ref,
  inst: any,
): IPagesFront => {
  if ($$BePaginProps.isFront) {
    // 分页切片
    const sliceList: Map<any, any> = new Map()
    // 前端分页列表计算处理
    const pageFrontData = computed((): Array<number> => {
      // 如果设置了每页显示 则使用 pageNumVal，否则使用初始用户设置的 pageSize
      const pageSize = $$BePaginMix.pageNumVal
        ? Number((unref($$BePaginMix.pageNumVal) as string).split('/')[0])
        : $$BePaginProps.pageSize
      // 最大頁數 = 數據縂條數/每頁顯示數量
      maxPageNum.value = Math.ceil($$BePaginProps.pageData.length / pageSize)
      $$BePaginMix.pageParamsFront.maxPageNum = maxPageNum.value
      // 处理空数组数据请来
      if (!$$BePaginProps.pageData.length || $$BePaginProps.pageData.length === 0) {
        sliceList.set(1, [])
        $$BePaginMix.pageParamsFront.maxPageNum = 1
      }
      // 返回最大页数数据
      inst.emit('getPageCount', $$BePaginMix.pageParamsFront)
      // 对分页数据根据最大页数和每页显示数进行切片缓存到 map 中
      for (let i = 1; i <= maxPageNum.value; i++) {
        const slice: Array<number> = $$BePaginProps.pageData.slice((i - 1) * pageSize, i * pageSize)
        sliceList.set(i, slice)
      }
      let pagerShowCount: number = $$BePaginProps.pagerShowCount
      // 顯示的頁碼數量中位數，用於計算是否顯示上下縮略頁
      const halfPagerCount: number = (pagerShowCount - 1) / 2
      // 当小于用户定义的显示页数 大于 用户总页数和显示数计算出来的总页数时，使用计算的总页数
      pagerShowCount = maxPageNum.value <= pagerShowCount ? maxPageNum.value : pagerShowCount
      // 计算当前页，大于最大页时，使用最大页
      const currentPage: number
        = Number($$BePaginProps.currentPage) > maxPageNum.value
          ? maxPageNum.value
          : Number($$BePaginProps.currentPage)
      // 初始时，返回切片数据
      if (currentPage === 1)
        inst.emit('updatePage', { data: sliceList.get(1) })

      let showPrevMore = false
      let showNextMore = false
      // 根据页数和显示页数，判断是否显示翻页缩略
      if (maxPageNum.value > pagerShowCount) {
        if (currentPage > pagerShowCount - halfPagerCount)
          showPrevMore = true

        if (currentPage < maxPageNum.value - (pagerShowCount - 2))
          showNextMore = true
      }
      // 根据 showNextMore 和 showPrevMore 也就是上下页缩略翻页的现实情况
      // 设置生成页码列表，循环渲染，值得注意的是第一页和最后一页永远都是显示的
      const array: Array<number> = []
      if (showPrevMore && !showNextMore) {
        // 只显示上页缩略翻页
        const startPage: number = maxPageNum.value - (pagerShowCount - 2)
        for (let i: number = startPage; i < maxPageNum.value; i++)
          array.push(i)
      } else if ((!showPrevMore && showNextMore) || (!showPrevMore && !showNextMore)) {
        // 只显示下页缩略翻页或都不显示时，pagerShowCount 的有效参数必须大于2
        // i 从2开始，刚好排除了第一页和最后一页永远都是显示的次数
        for (let i = 2; i < pagerShowCount; i++)
          array.push(i)
      } else if (showPrevMore && showNextMore) {
        // 上下页缩略翻页都显示时，渲染范围根据当前页，前后各偏移
        const offset: number = Math.floor(pagerShowCount / 2) - 1
        for (let i: number = currentPage - offset; i < currentPage + offset + 1; i++)
          array.push(i)
      }
      showPrev.value = showPrevMore
      showNext.value = showNextMore
      return array
    })

    /**
     *上一页
     */
    const prePageFront = (): void => {
      let currentPage: number
        = Number($$BePaginProps.currentPage) > maxPageNum.value
          ? maxPageNum.value
          : Number($$BePaginProps.currentPage)
      if (currentPage !== 1 && currentPage > 0 && $$BePaginProps.isFront) {
        // 将翻页后的页码参数、切片表格数据传递到父组件
        inst.emit('updatePage', { data: sliceList.get(--currentPage) })
      }
    }
    /**
     *下一页
     */
    const nextPageFront = (): void => {
      let currentPage: number
        = Number($$BePaginProps.currentPage) > maxPageNum.value
          ? maxPageNum.value
          : Number($$BePaginProps.currentPage)
      if (currentPage !== $$BePaginMix.pageParamsFront.maxPageNum && $$BePaginProps.isFront) {
        // 将翻页后的页码参数、切片表格数据传递到父组件
        inst.emit('updatePage', { data: sliceList.get(++currentPage) })
      }
    }
    return {
      sliceList,
      frontList: pageFrontData.value,
      prePageFront,
      nextPageFront,
    }
  } else {
    return {
      sliceList: undefined,
      frontList: undefined,
      prePageFront: undefined,
      nextPageFront: undefined,
    }
  }
}
