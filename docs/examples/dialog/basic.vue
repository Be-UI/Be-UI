<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button @click="show = true" style="margin-right: 5px" customClass="sm:mb-4" bordered>
    桃李春风
  </be-button>
  <be-dialog
      titles="方珍珠"
      v-model:is-show="show">
    <p>破风筝唱有一位姑娘本姓方，帮助她爸爸糊后窗。有朝一日她出了嫁，谁肯来帮爸爸的忙笑哈哈哈。</p>
    <p>方大凤也唱有一位姑娘本姓方，爱她的爸爸也爱她娘。她妈妈一点一点的有了进步，她爸爸精明又要强。</p>
  </be-dialog>
</template>
