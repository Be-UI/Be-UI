<template>
  <be-icon icon="search"></be-icon>
  123456
</template>
<script lang="ts" setup>
  import { BeNotification } from '../../../dist/lib/be-ui.es.js'
  const notify = BeNotification.service
  notify({
    titles: `与永恒拔河`,
    description: `无关风月`,
    msgType: 'success',
    duration: null,
  })
</script>
