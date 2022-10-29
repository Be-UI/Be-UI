/*
* @be-loading-elm.vue
* @deprecated
* @author czh
* @update (czh 2022/5/19)
*/
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { getUuid } from '@be-ui/utils'

export default defineComponent({
  name: 'BeLoadingElm',
  setup() {
    const isBackgroundStyle = inject('isBackgroundStyle')
    const customRender = inject('customRender') as Function
    const color = inject('color')
    const round = inject('round')
    const sizeLoader = inject('sizeLoader')
    const loadingAnim = ref<Array<any>>([])
    for (let i = 0; i <= 2; i++)
      loadingAnim.value.push(getUuid())

    return {
      isBackgroundStyle,
      color,
      round,
      sizeLoader,
      customRender,
      loadingAnim,
    }
  },
})
</script>

<template>
  <div
    :style="`border-radius: ${round}px;`"
    :class="`be-load--container be-load__${sizeLoader} ${isBackgroundStyle}`"
  >
    <div v-if="customRender">
      <component :is="customRender()"/>
    </div>
    <div v-if="!customRender">
      <div
        v-for="(item) in loadingAnim"
        :key="item"
        class="circle--box"
      >
        <span :style="`background-color:${color}`" />
        <span :style="`background-color:${color}`" />
        <span :style="`background-color:${color}`" />
        <span :style="`background-color:${color}`" />
      </div>
    </div>
  </div>
</template>
