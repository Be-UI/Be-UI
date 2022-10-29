<template>
  <div class="bg-pink-50 relative flex items-center justify-center" style="width: 300px; height: 300px">
    <be-button @click="handleClick" type="default" bordered>点击开启</be-button>
  </div>
</template>
<script lang="ts" setup>
import { BeLoadingSer } from 'be-ui'
 const handleClick = () =>{
   const loadingInst = BeLoadingSer.init({
     bgColor:'#F2F4F5',
     text:'正在访问中，请稍候…',
     color:'#b1b1b1',
   })
   setTimeout(()=>{
     BeLoadingSer.close(loadingInst)
   },2000)
 }
</script>
