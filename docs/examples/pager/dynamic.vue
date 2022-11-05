<template>
  <div class="exp-pager">
    <be-pagination
      isDynamic
      :pageSize="pageParams.pageSize"
      :currentPage="pageParams.currentPage"
      :pagerShowCount="5"
      :layout="['jump', 'page', 'pNum', 'info']"
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

const updateNum = (data:number):void =>{
pageParams.pageSize = data
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

