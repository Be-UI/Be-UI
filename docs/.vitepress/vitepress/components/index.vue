<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useData, useRoute } from 'vitepress'
  export default defineComponent({
    name: 'VPAPP',
    setup() {
      // 通过api能够拿到一些配置、数据、md内容，根据内容渲染
      const { page } = useData()
      const content = ref<{ $el: HTMLElement }>()

      return {
        content,
      }
    },
  })
</script>

<template>
  <div class="App">
    <!--  渲染mkd内容    -->
    <Content ref="content" class="doc-content" />
  </div>
</template>
