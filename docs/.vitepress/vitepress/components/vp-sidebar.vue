<template>
    <div class="flex flex-col items-start w-full py-4 sidebar">
        <section v-for="(item) in list"
             style="height: 45px"
             class="sidebar-groups font-mono bg-default w-full mb-2 flex flex-col px-8"
             :key="item.link">
            <p class="sidebar-group__title">{{ item.text }}</p>
            <a v-for="(child, childKey) in item.children"
               :key="childKey"
                @click="handleClick"
                :class="{link: true,'aside-active': handleActive(child),'flex items-center': item.promotion,}"
                 class="hover:shadow hover:text-pink-500 hover:font-bold"
                :href="`#${pageFlag === 'introduction' ? child.text : child.link}`">
                <p class="link-text">{{ child.text }}</p>
            </a>
        </section>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
//import {config} from '../../src/aside-config/index'
import {useRouter, Router, useRoute, Route} from 'vitepress'
import {useData} from 'vitepress'
import {isActive, isActiveIntro} from "../../../utils/utils";
export default defineComponent({
    name: "vp-sidebar",
    setup() {
        const router: Router = useRouter()
        const routerPush = (url: string): void => {
            router.go(url)
        }
        const {theme, page} = useData()
        // 监听设置 sidebar 列表
        const relativePath = computed(() => {
            return page.value.relativePath
        })
        watch(relativePath, () => {
            list.value = []
            getList()
        })
        const list = ref<any>([])
        const pageFlag = ref<string>('')
        const getList = (): void => {
            pageFlag.value = page.value.relativePath.split('/')[1]
            if (pageFlag.value) {
                list.value = theme.value.sidebar[`/${pageFlag.value}/`]
            }
        }
        getList()
        const route: Route = useRoute()
        const href = ref('.html#介绍')
        const handleActive = computed(()=>{
            return function (item):boolean {
                if(pageFlag.value === 'introduction'){
                    return isActiveIntro(href.value,item.text)
                }else{
                    return isActive(route, item.link)
                }
            }
        })
        const handleClick = ():void=>{
            href.value = location.href
        }
        return {
            handleClick,
            href,
            handleActive,
            //config,
            pageFlag,
            list,
            routerPush,
            route
        }
    }
})
</script>

<style scoped>
.aside-active {
    @apply bg-pink-50 text-pink-500;
}
.sidebar{
    position: fixed;
    width: inherit;
}
.sidebar .sidebar-groups .sidebar-group__title{
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 24px;
}
.link {
    padding: 10px 16px;
    line-height: 1.5;
    font-size: 1rem;
    border-radius: 8px;
    @apply mb-2
}
</style>