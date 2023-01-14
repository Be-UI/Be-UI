<template>
  <div class="be-badge">
    <slot />
    <sup
      v-if="show"
      class="be-badge--sup"
      :class="`
         be-badge--sup__${type}
         ${isDot ? 'be-badge--dot ' : ''}`"
    >
      {{ contentValue }}
    </sup>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import { isNumber } from '@be-ui/utils'
export default defineComponent({
  name: 'BeBadge',
  props:{
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String as PropType<'primary'|'success' |'info'|'warning'|'error'>,
      default: 'error',
    },
    show: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 100,
    },
    isDot: {
      type: Boolean,
      default: false,
    },
  },
  setup(props){
    const contentValue = computed<string>(() => {
      if (props.isDot) return ''
      if (isNumber(props.value) && isNumber(props.max))
        return props.max < props.value ? `${props.max}+` : `${props.value}`

      return `${props.value}`
    })

    return {
      contentValue
    }
  }
})
</script>
