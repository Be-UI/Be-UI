<template>
  <main class="be-main">
    <slot />
  </main>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'BeMain',
  })
</script>
