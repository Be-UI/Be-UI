<template>
  <div class="exp-pager">
    <be-pagination
        isFront
        :pageSize="pageParamsFront.pageSize"
        :currentPage="pageParamsFront.currentPage"
        :pageData="pageDataFront"
        :pagerShowCount="5"
        @updateNum='updateNumFront'
        @updatePage="updatePageFront"
        @changePage="pageChangeFront">
    </be-pagination>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { BePagination } from "@be-ui/components";

type IPageData = {
  currentPage: number
  pageCount: number
  pageSize: number
  total?:number
}

let pageDataFront = ref<Array<{ num: number }>>([])

for (let i = 0; i < 3000; i++) {
  pageDataFront.value.push({num: i})
}

let pageParamsFront = reactive({
  currentPage: 1,
  pageNum: 1,
  pageSize: 20,
  total: pageDataFront.value.length,
})

const updatePageFront = (data: { num: number }): void => {
  console.log(data)
}

const updateNumFront = (data: IPageData): void => {
  pageParamsFront.pageSize = data.pageSize
}

const pageChangeFront = (data: IPageData): void => {
  pageParamsFront.currentPage = data.currentPage
}
</script>
<style>
.exp-pager{
  @apply bg-pink-50 px-4;
}
</style>

