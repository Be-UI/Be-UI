<template>
  <div style="width: 100%;height: 200px" />
  <BeBadge :value="123" :show="true" :max="10" :is-dot="false" type="primary">
    <button type="button">
      123
    </button>
  </BeBadge>
</template>

<script lang="ts" setup>
import { BeBadge } from '@be-ui/components'
</script>
