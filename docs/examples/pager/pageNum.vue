<template>
  <div class="exp-pager">
    <be-pagination
      isOrdianry
      :pagerShowCount="8"
      :pageSize="pageParams.pageSize"
      :pageCount="pageParams.total"
      :pageNum="[{label: 10}, {label: 20}, {label: 30}, {label: 100}]"
      :currentPage="pageParams.currentPage"
      @updateNum = 'updateNum'
      @changePage="pageChange">
  </be-pagination>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
type IPageData = {
  currentPage: number
  pageCount: number
  pageSize: number
  total?:number
}

let pageParams = reactive({
  currentPage: 1,
  pageNum: 1,
  pageSize: 200,
  total: 3000
})

const updateNum = (data:IPageData):void =>{
pageParams.pageSize = data.pageSize
}

const pageChange = (data:IPageData):void =>{
    pageParams.currentPage = data.currentPage
}
</script>
<style>
.exp-pager{
  @apply bg-pink-50 px-4;
}
</style>

