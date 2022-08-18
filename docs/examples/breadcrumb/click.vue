<template>
  <be-breadcrumb>
    <be-breadcrumb-item :click="handleClick" to="/我不愿让你一个人">我不愿让你一个人</be-breadcrumb-item>
    <be-breadcrumb-item :click="handleClick" to="/爱情的模样">爱情的模样</be-breadcrumb-item>
    <be-breadcrumb-item :click="handleClick" to="/知足">知足</be-breadcrumb-item>
  </be-breadcrumb>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  setup(){
    const handleClick = (params) =>{
      console.log(params)
    }
    return{
      handleClick
    }
  }
})

</script>