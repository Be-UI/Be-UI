<template>
  <div class="bg-pink-50 relative flex items-center justify-center" style="width: 300px; height: 300px">
    <be-loading :show="showFull" isFullScreen ></be-loading>
    <be-button @click="handleClick" type="default" bordered>点击开启</be-button>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
 const showFull = ref()
 const handleClick = () =>{
   showFull.value = true
   setTimeout(()=>{
     showFull.value = false
   },2000)
 }
</script>
