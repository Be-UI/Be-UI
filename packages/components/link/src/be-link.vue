<template>
  <a class="be-link"
     :class="beLinkClass"
     :href="disabled ? null : href"
     v-on="$attrs">
    <slot name="prevIcon">
      <be-icon v-if="prevIcon" :icon="prevIcon"></be-icon>
    </slot>
    <span
        style="text-decoration: auto;"
        class="be-link--content">{{content}}</span>
    <slot name="nextIcon">
      <be-icon v-if="nextIcon" :icon="nextIcon"></be-icon>
    </slot>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { BeIcon } from '@be-ui/components/icon'
export default defineComponent({
  name: "BeLink",
  components:{BeIcon},
  props: {
    content: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'>,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    underline: {
      type: Boolean,
      default: false,
    },
    href:{
      type: String,
      default: ''
    },
    prevIcon:{
      type: String,
      default: ''
    },
    nextIcon:{
      type: String,
      default: ''
    },
  },
   setup(props){
    const beLinkClass = computed(()=>{
      return ` be-link__${props.type} ${
        props.disabled ? "be-link--disabled" : ''} ${
        props.underline ? "be-link--underline" : ''}`
    })
     return {
       beLinkClass,
     }
   }
})
</script>

<style scoped>

</style>
