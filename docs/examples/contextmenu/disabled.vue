<template>
  <div class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px"
       v-contextmenu:disabledContextmenu>
    点我无效哦~
    <be-contextmenu ref="disabledContextmenu" disabled>
      <be-contextmenu-item>金粟如来出世，蕊宫仙子乘风。</be-contextmenu-item>
      <be-contextmenu-item>清香一袖意无穷。洗尽尘缘千种。</be-contextmenu-item>
      <be-contextmenu-item> 十分秋意与玲珑。拚却今宵无梦。</be-contextmenu-item>
      <be-contextmenu-item> 十分秋意与玲珑。拚却今宵无梦。</be-contextmenu-item>
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