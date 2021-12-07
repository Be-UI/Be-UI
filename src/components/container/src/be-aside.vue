<template>
  <aside class="be-aside" :style="style">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'BeAside',
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(
          () => props.width ? { 'width': props.width, } : {}
      )
    }
  },
})
</script>
