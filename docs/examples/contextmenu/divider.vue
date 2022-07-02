<template>
  <div class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px" v-contextmenu:dividerContextmenu>
    右键点我~
    <be-contextmenu ref="dividerContextmenu">
      <be-contextmenu-item>《西江月·人道偏宜歌舞》</be-contextmenu-item>
      <be-contextmenu-item divider ></be-contextmenu-item>
      <be-contextmenu-item>人道偏宜歌舞，天教只入丹青。喧天画鼓要他听。把著花枝不应。</be-contextmenu-item>
      <be-contextmenu-item>把著花枝不应。何处娇魂瘦影，向来软语柔情。</be-contextmenu-item>
    </be-contextmenu>

  </div>
</template>

<script>
import {contextmenu} from "@be-ui/utils/index.ts"

import {defineComponent} from "vue";
export default defineComponent({
  directives: {contextmenu},
})


</script>