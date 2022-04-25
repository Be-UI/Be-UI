<template>
  <header class="be-header" :style="style">
    <slot></slot>
  </header>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({
    name: 'BeHeader',
    props: {
      height: {
        type: String,
        default: null,
      },
    },
    setup(props) {
      return {
        style: computed(() => (props.height ? { height: props.height } : {})),
      }
    },
  })
</script>
