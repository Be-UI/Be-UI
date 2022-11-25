<template>
  <div class="flex">
    <be-tag is-close custom-class="mr-4" @close="handleClose">
      和人
    </be-tag>
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('close')
}
</script>
