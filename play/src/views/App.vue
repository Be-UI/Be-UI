<script setup lang="tsx" name="app">
import BeLoading from '@be-ui/components/loading-plugin'
import {defineComponent, h} from "vue";
const customRenderComp = {
  render(){
    return <div>雪中</div>
  }
}
const customRenderContent = ()=>defineComponent(customRenderComp)
</script>

<template>
  <div id="app_index">
    <div class="bg-pink-50 relative" style="width: 300px; height: 300px">
      <be-loading show :customRender = 'customRenderContent'></be-loading>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/style/app.scss";
</style>

