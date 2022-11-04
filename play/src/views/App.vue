<template>
  <div class="exp-input">


    <be-select size="medium" :list="baseList"
               keyValue="id"
               disabled
               v-model="mediumVal"
               labelValue="label">

    </be-select>
<!--    <be-popover customClass="header-popover" trigger="click">
      <template #trigger>
        <be-button style="margin-right: 5px" customClass="sm:mb-4" type="info" bordered>苦瓜</be-button>
      </template>
      <p>今天先记得听过人说这叫半生瓜</p>
      <p>那意味着它的美年轻不会洞察吗</p>
      <p>到大悟大彻将一切都升华 这一秒坐拥晚霞</p>
      <p>我共你觉得苦也不太差</p>
    </be-popover>-->
  </div>


</template>
<script setup lang="ts">
import {BeSelect, BePopover, BeButton} from "@be-ui/components";
import { ref } from 'vue'
const baseList = ref<Array<{ id: string, label: string }>>([
  {id: '君埋泉下泥销骨', label: '君埋泉下泥销骨'},
  {id: '我寄人间雪满头', label: '我寄人间雪满头'},
  {id: '满堂花醉三千客', label: '满堂花醉三千客'},
  {id: '一剑霜寒十四州', label: '一剑霜寒十四州'},
  {id: '两人对酌山花开', label: '两人对酌山花开'},
  {id: '一杯一杯复一杯', label: '一杯一杯复一杯'},
  {id: '我醉欲眠卿且去', label: '我醉欲眠卿且去'},
  {id: '明朝有意抱琴来', label: '明朝有意抱琴来'},
])

const mediumVal = ref<string>('')


</script>
<style lang="scss">
.exp-input{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-select{
    width: 230px;
    margin: 0 6px;
  }
}
</style>