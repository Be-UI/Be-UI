<template>
  <div class="flex">
    <be-tag @close="handleClose" isClose customClass="mr-4">
      和人
    </be-tag>
  </div>

</template>
<script setup>
const handleClose = () =>{
  console.log('close')
}
</script>
