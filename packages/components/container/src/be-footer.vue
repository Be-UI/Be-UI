<template>
  <footer
    class="be-footer"
    :style="style"
  >
    <slot />
  </footer>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({
    name: 'BeFooter',
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
