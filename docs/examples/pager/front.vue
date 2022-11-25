<template>
  <div class="exp-pager">
    <be-pagination
      is-front
      :page-size="pageParamsFront.pageSize"
      :current-page="pageParamsFront.currentPage"
      :page-data="pageDataFront"
      :pager-show-count="5"
      @update-num="updateNumFront"
      @update-page="updatePageFront"
      @change-page="pageChangeFront"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
type IPageData = {
  currentPage: number
  pageCount: number
  pageSize: number
  total?:number
}

const pageDataFront = ref<Array<{ num: number }>>([])

for (let i = 0; i < 3000; i++)
  pageDataFront.value.push({ num: i })

const pageParamsFront = reactive({
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
