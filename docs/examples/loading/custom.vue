<template>
  <div class="bg-pink-50 relative" style="width: 300px; height: 300px">
    <be-loading show :customRender = 'customRenderContent'></be-loading>
  </div>
</template>
<script lang="tsx" setup>
import {defineComponent, h} from "vue";
const customRenderComp = {
  render(){
    return <div>雪中</div>
  }
}
const customRenderContent = ()=>defineComponent(customRenderComp)
</script>
