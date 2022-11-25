<template>
  <div class="exp-pager">
    <be-pagination
      is-dynamic
      :page-size="pageParams.pageSize"
      :current-page="pageParams.currentPage"
      :pager-show-count="5"
      :layout="['jump', 'page', 'pNum', 'info']"
      @update-num="updateNum"
      @change-page="pageChange"
    />
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

const pageParams = reactive({
  currentPage: 1,
  pageNum: 1,
  pageSize: 200,
  total: 3000,
})

const updateNum = (data:IPageData):void => {
  pageParams.pageSize = data.pageSize
}

const pageChange = (data:IPageData):void => {
  pageParams.currentPage = data.currentPage
}
</script>

<style>
.exp-pager{
  @apply bg-pink-50 px-4;
}
</style>
