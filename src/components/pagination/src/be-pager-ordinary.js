export default {
  computed: {
    /**
     * 页码数组生成方法
     * 根据传入参数，生成页码列表，循环渲染
     * @returns {[]}
     */
    pagers() {
      const pagerCount = this.pagerShowCount;
      const halfPagerCount = (pagerCount - 1) / 2;
      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);
      let showPrevMore = false;
      let showNextMore = false;
      // 根据页数和显示页数，判断是否显示翻页缩略
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }
      // 根据 showNextMore 和 showPrevMore 也就是上下页缩略翻页的现实情况
      // 设置生成页码列表，循环渲染，值得注意的是第一页和最后一页永远都是显示的
      const array = [];
      if (showPrevMore && !showNextMore) {
        // 只显示上页缩略翻页
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
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
      return array;
    }
  }
}
