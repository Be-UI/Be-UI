<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useData} from 'vitepress'
import VpHeader from "./vp-header.vue";
import {BeHeader} from "../../../public/be-ui/be-ui.es";

export default defineComponent({
    name: 'VPAPP',
    components: {VpHeader},
    setup() {
        // 通过api能够拿到一些配置、数据、md内容，根据内容渲染
        const {page} = useData()
        const content = ref<{ $el: HTMLElement }>()

        return {
            content,
        }
    },
})
</script>

<template>
    <div class="App">
        <be-container class="be-ui-doc-container h-full" style="overflow-y: hidden">
        <be-header class="flex items-center justify-between fixed w-full bg-default shadow">
            <vp-header></vp-header>
        </be-header>
        <!--  渲染mkd内容    -->
            <be-main class="be-ui-doc-main scroll-diy relative" >
                <Content ref="content" class="content-body"/>
            </be-main>
        </be-container>
    </div>
</template>
<style lang="scss">
.App .be-header{
    @apply px-8;
}
.be-ui-doc-main{
    height: calc(100vh - 60px);
    top: 60px;
}
.content-body{
    @apply w-full h-full absolute left-0 top-0;
    & >div:first-child{
        @apply w-full h-full;
    }
}

</style>
