<template>
    <div class="be-ui-doc-home">
        <div class="w-full h-full flex items-center flex-col justify-center">
            <div class="flex items-center justify-center mb-8 animate__animated animate__zoomIn">
                <img src="../assets/img/logo.png" style="height: 80px" alt=""/>
                <h1 class="text-6xl font-mono">Be-UI3</h1>
            </div>
            <div class="flex items-center justify-center mb-8 animate__animated animate__fadeIn">
                <h1 class="text-lg font-mono">一个基于 Vue3 的简单 UI 组件库</h1>
            </div>
            <div class="flex items-center justify-center font-mono animate__animated animate__fadeInUp">
                <be-button @click="routerPush('/doc/introduction')" type="success" customClass="m-4 start-btn">开始使用
                </be-button>
                <be-button @click="routerPush('/doc/docContainer')" customClass="m-4" bordered>文档</be-button>
            </div>
            <!--            <img src="../assets/img/hua-center.png" class="fixed bottom-0 animate__animated animate__fadeInUpBig" alt=""/>
                        <img src="../assets/img/hua-left.png" class="fixed bottom-0 left-0 animate__animated animate__fadeInUpBig" alt=""/>
                        <img src="../assets/img/hua-right.png" class="fixed bottom-0 right-0 animate__animated animate__fadeInUpBig" alt=""/>-->
            <!--          <img src="../assets/img/hb.gif" style="width: 200px;height: 200px;" class="fixed bottom-0 right-0 animate__animated animate__fadeInUpBig" alt=""/>
                      <img src="../assets/img/hb.gif" style="width: 200px;height: 200px;right: 200px" class="fixed bottom-0 animate__animated animate__fadeInUpBig" alt=""/>-->
        </div>
        <div class=" w-1/3 h-1/3 fixed left-0 animate__animated animate__fadeInLeft"
             style="top:30%;transform: translateY(-50%)">

        </div>
        <div class=" w-1/3 h-1/3 fixed right-0 animate__animated animate__fadeInRight"
             style="top:30%;transform: translateY(-50%)">
        </div>
    </div>

</template>

<script lang="ts">

import {defineComponent} from "vue";
import {Route, Router, useRoute, useRouter} from 'vitepress'

export default defineComponent({

    setup() {
        const route: Route = useRoute()
        const router: Router = useRouter()
        const routerPush = (url: string): void => {
            router.go(url)
        }
        return {
            routerPush,
            route
        }
    }
})
</script>

<style scoped>
.be-ui-doc-container .start-btn{
    @apply bg-pink-50 text-pink-500 hover:bg-pink-100;
}
.be-ui-doc-home{
    @apply w-full h-full;
}
</style>