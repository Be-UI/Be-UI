/* * @vp-demo.vue * @deprecated * @author czh * @update (czh 2022/4/25) */
<template>
  <ClientOnly>
    <div
      class="text-lg my-6 rounded p-6 border-t-8 border-l-2 border-r-2 border-b-2"
      @click="showCode = !showCode"
      style="border-top-color: #ec4899">
      <p class="text-lg my-6" v-html="decodeURIComponent(description)"></p>
      <vp-example :file="path" :demo="formatPathDemos(path)"></vp-example>
      <vp-source-code :source="source" v-if="showCode"></vp-source-code>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import VpExample from './demo/vp-example.vue'
  import VpSourceCode from './demo/vp-source-code.vue'

  export default defineComponent({
    name: 'vp-demo',
    props: {
      demos: {
        type: Object,
        default: function () {
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
    components: { VpSourceCode, VpExample },
    setup() {
      const modules = import.meta.globEager('../../../examples/**/**.vue')
      const formatPathDemos = computed(() => {
        return function (path: string) {
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

<style scoped></style>
