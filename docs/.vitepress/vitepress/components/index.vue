<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import {useData} from 'vitepress'
import VpHeader from "./vp-header.vue";
import VpSidebar from "./vp-sidebar.vue";
export default defineComponent({
    name: 'VPAPP',
    components: {VpSidebar, VpHeader},
    setup() {
        // 通过api能够拿到一些配置、数据、md内容，根据内容渲染
        const {page} = useData()
        const showSidebar = computed(()=>{
            return !(page.value.relativePath === 'index.md')
        })
        const content = ref<{ $el: HTMLElement }>()

        return {
            showSidebar,
            content,
        }
    },
})
</script>

<template>
    <div class="App">
        <be-container class="be-ui-doc-container h-full">
            <be-header class="flex items-center justify-between fixed w-full bg-default shadow" style="z-index: 2077">
                <vp-header></vp-header>
            </be-header>
            <!--  渲染mkd内容    -->
            <be-container class="mt-14">
                <!--  侧边导航    -->
                <be-aside class="scroll-diy bg-default shadow md:block sm:hidden"
                          v-if="showSidebar"
                          style="overflow-y: auto">
                          <vp-sidebar></vp-sidebar>
                </be-aside>
                <be-main class="be-ui-doc-main scroll-diy relative">
                    <Content ref="content" class="doc-content content-body" :class="{'content-body--home':!showSidebar}"/>
                </be-main>
            </be-container>
        </be-container>
    </div>
</template>
<style lang="scss">
.App .be-header {
    @apply px-8;
}

.App .be-ui-doc-main {
   /* height: calc(100vh - 60px);*/
    padding: 1.25rem 6rem;
   /* overflow-y: auto;*/
}

.content-body {

    & > div:first-child {
        @apply w-full h-full;
    }

    /*& h2::after {
        content: '';
        width: 100%;
        height: 2px;
        background-color: $mainColor;
        border-radius: 4px;
        position: absolute;
        top: 40px;

    }*/
}
.content-body--home{
    @apply w-full h-full absolute left-0 top-0;
}

</style>
