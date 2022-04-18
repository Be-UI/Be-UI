<template>
    <div class="flex flex-1 items-center">
        <div class="flex h-10 items-center cursor-pointer md:w-64 sm:w-12" @click="routerPush(navs[0].link)">
            <img src="../assets/img/logo.png" class="h-10 w-10 mr-4 "/>
            <div class="font-mono text-2xl md:flex sm:hidden">
                Be-UI3
            </div>
        </div>

        <div class="h-10 flex items-center justify-between ml-10">
            <div class="w-12 cursor-pointer font-mono md:flex sm:hidden"
                 v-for="(item) in navs"
                 :key="item.link + item.text"
                 @click="routerPush(item.link)">
                {{ item.text }}
            </div>
            <vp-search class="search" :options="theme.algolia" multilang></vp-search>
        </div>
    </div>

    <div class="flex-1 text-right font-mono md:block sm:hidden">
        V 1.0.2
    </div>
    <div class="text-right md:hidden sm:flex">
        <be-icon icon="type" customClass="menu-icon"></be-icon>
    </div>

</template>

<script lang="tsx">
import {defineComponent} from "vue";
import { useNav } from '../composables/nav'
import { useRouter,Router } from 'vitepress'
import VpSearch from "./vp-search.vue";
import { useData } from 'vitepress'
//import {initAlgolia} from "../utils/algolia";

export default defineComponent({
    name: "vp-header",
    components: {
        VpSearch

    },
    setup() {
        const navs = useNav()
        const { theme } = useData()
        /**
         * 跳转方法
         * @param path 路由地址
         */
        const router: Router = useRouter()
        const routerPush = (path: string): void => {
                 router.go(path)
        }
        return {
            theme,
            routerPush,
            navs
        }
    }
})
</script>

<style>
.menu-icon .be-icon {
    @apply w-6 h-6
}

</style>