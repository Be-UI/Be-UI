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
        <be-header class="flex items-center justify-between fixed w-full bg-default shadow">
            <vp-header></vp-header>
        </be-header>
        <!--  渲染mkd内容    -->
        <Content ref="content"/>
    </div>
</template>
<style>
.App .be-header{
    @apply px-8;
}
</style>
