<template>
  <be-link href="https://www.baidu.com"
           content="demo"
           nextIcon="add"
           underline
           type="error"
           target="_blank">
          <template #nextIcon>nextIcon</template>
  </be-link>
</template>
<script setup>
import { BeLink } from "@be-ui/components";
</script>

