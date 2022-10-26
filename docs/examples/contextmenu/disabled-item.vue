<script>
import { contextmenu } from '@be-ui/utils/index.ts'

import { defineComponent } from 'vue'
export default defineComponent({
  directives: { contextmenu },
})
</script>

<template>
  <div v-contextmenu:disabledContextmenuItem class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px">
    右键点我~
    <be-contextmenu ref="disabledContextmenuItem">
      <be-contextmenu-item disabled>
        粉面都成醉梦，霜髯能几春秋。来时诵我伴牢愁。
      </be-contextmenu-item>
      <be-contextmenu-item>一见尊前似旧。诗在阴何侧畔，字居罗赵前头。</be-contextmenu-item>
    </be-contextmenu>
  </div>
</template>
