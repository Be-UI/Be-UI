<script lang="ts">
import { defineComponent } from 'vue'
import type { Route, Router } from 'vitepress'
import { useRoute, useRouter } from 'vitepress'

export default defineComponent({
  setup() {
    const route: Route = useRoute()
    const router: Router = useRouter()
    const routerPush = (url: string): void => {
      router.go(url)
    }
    return {
      routerPush,
      route,
    }
  },
})
</script>

<template>
  <div class="be-ui-doc-home">
    <div class="w-full h-full flex items-center flex-col justify-center">
      <div class="flex items-center justify-center  animate__animated animate__zoomIn">
        <img src="../assets/img/logo.png" style="height: 80px" alt="">
        <h1 class="text-6xl font-mono">
          Be-UI3
        </h1>
      </div>
      <div class="flex items-center justify-center  animate__animated animate__fadeIn">
        <p class="font-bold font-mono text-5xl main-title" >
          一个基于Vue3的简单 UI 组件库
        </p>
      </div>
      <div class="flex items-center justify-center font-mono animate__animated animate__fadeInUp relative">
        <be-button
          type="success"
          custom-class="m-4 start-btn"
          @click="routerPush('views/introduction/intro')"
        >
          开始使用
        </be-button>
        <be-button custom-class="m-4" bordered @click="routerPush('views/document/icon')">
          文档
        </be-button>
      </div>
        <img style="z-index: -1" src="../assets/img/hua-center.png" class="fixed bottom-0 animate__animated animate__fadeInUpBig" alt=""/>
        <img style="z-index: -1" src="../assets/img/hua-left.png" class="fixed bottom-0 left-0 animate__animated animate__fadeInUpBig" alt=""/>
        <img style="z-index: -1" src="../assets/img/hua-right.png" class="fixed bottom-0 right-0 animate__animated animate__fadeInUpBig" alt=""/>
      </div>
    <div
      class="w-1/3 h-1/3 fixed left-0 animate__animated animate__fadeInLeft"
      style="top: 30%; transform: translateY(-50%)"
    />
    <div
      class="w-1/3 h-1/3 fixed right-0 animate__animated animate__fadeInRight"
      style="top: 30%; transform: translateY(-50%)"
    />
  </div>
</template>

<style scoped>
  .be-ui-doc-container .start-btn {
    @apply bg-pink-50 text-pink-500 hover:bg-pink-100;
  }
  .be-ui-doc-home {
    @apply w-full h-full;
  }
  .main-title{
    background: -webkit-linear-gradient(315deg, rgba(220, 122, 171, .5) 25%, rgba(236, 72, 153, 1) 50%, rgb(35,250,243) 75%, rgb(42,150,243) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
