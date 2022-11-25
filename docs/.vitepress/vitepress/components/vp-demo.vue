/* * @vp-demo.vue * @deprecated * @author czh * @update (czh 2022/4/25) */
<template>
  <ClientOnly>
    <div
      class="text-lg my-6 rounded p-6 border-t-8 border-l-2 border-r-2 border-b-2 w-full"
      style="border-top-color: #ec4899;max-width: calc(86vw - 200px);"
    >
      <p class="text-lg my-6" v-html="decodeURIComponent(description)" />
      <VpExample :file="path" :demo="formatPathDemos(path)" />
      <VpSourceCode v-if="showCode" :source="source" />
      <a class="text-center text-light-blue-400 text-sm cursor-pointer m-0 w-full block" @click="showCode = !showCode">view code</a>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import VpExample from './demo/vp-example.vue'
import VpSourceCode from './demo/vp-source-code.vue'

export default defineComponent({
  name: 'VpDemo',
  components: { VpSourceCode, VpExample },
  props: {
    demos: {
      type: Object,
      default() {
        return {}
      },
    },
    source: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    rawSource: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {
    const modules = import.meta.globEager('../../../examples/**/**.vue')
    const formatPathDemos = computed(() => {
      return function(path: string) {
        const key: string = `../../../examples/${path}`
        const rawDemos = modules[`${key}.vue`]
        const demos = {}
        demos[`../${path}`] = rawDemos.default
        return demos
      }
    })
    const showCode = ref<boolean>(false)
    return {
      showCode,
      formatPathDemos,
    }
  },
})
</script>

<style>
.view-code{
  font-size:12px;
  margin: 0;
  text-align: center;
}
</style>
