import type { IPageProvide } from './be-pagination-type'

/**
 * 计算 动态 分页列表数据
 * @param {Object} $$BePaginProps - provide/inject的 page Props
 */
export const pagersDynamicList = ($$BePaginProps: IPageProvide) => {
  if ($$BePaginProps.isDynamic) {
    const array: Array<number> = []
    const currentPage: number
      = Number($$BePaginProps.currentPage) >= 1 ? Number($$BePaginProps.currentPage) : 1
    const showPageCount = Number($$BePaginProps.pagerShowCount)
    const halfPagerCount: number = parseInt(String(showPageCount / 2))
    // 小于等于showPageCount中位数halfPagerCount 显示范围1-showPageCount
    if (currentPage <= halfPagerCount) {
      for (let i = 1; i <= showPageCount; i++)
        array.push(i)
    }
    // 大于等于showPageCount中位数halfPagerCount 显示范围 差值offset ~ showPageCount + 差值offset
    if (currentPage > halfPagerCount) {
      const offset: number = currentPage - halfPagerCount
      for (let i: number = offset; i < showPageCount + offset; i++)
        array.push(i)
    }
    return array
  }
  return []
}
