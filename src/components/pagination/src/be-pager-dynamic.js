export default {
  computed: {
    pagersDynamic() {
      let array = []
      const currentPage = Number(this.currentPage) >= 1 ? Number(this.currentPage) : 1
      const showPageCount = Number(this.pagerShowCount)
      const halfPagerCount = parseInt(showPageCount / 2 );
      // 小于等于showPageCount中位数halfPagerCount 显示范围1-showPageCount
      if(currentPage <= halfPagerCount){
        for(let i = 1;  i <= showPageCount; i++){
          array.push(i)
        }
      }
      // 大于等于showPageCount中位数halfPagerCount 显示范围 差值offset ~ showPageCount + 差值offset
      if(currentPage > halfPagerCount){
        const offset = currentPage - halfPagerCount
        for(let i = offset;  i < showPageCount + offset; i++){
          array.push(i)
        }
      }
      return array
    }
  },
}
