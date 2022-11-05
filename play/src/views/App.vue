<template>
  <div class="exp-pager">
    <be-pagination
        isOrdianry
        :pagerShowCount="5"
        :pageSize="pageParams.pageSize"
        :pageCount="pageParams.total"
        :currentPage="pageParams.currentPage"
        @updateNum = 'updateNum'
        @changePage="pageChange">
      <template #prev>🐕</template>
      <template #next>🥑</template>
    </be-pagination>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { BePagination } from "@be-ui/components";

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

