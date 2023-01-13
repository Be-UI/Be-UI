<template>
  <div class="be-badge">
    <slot />
    <sup
      v-if="show"
      class="be-badge--sup"
      :class="`
         be-badge--sup__${props.type}
         ${props.isDot ? 'be-badge--dot ' : ''}`"
    >
      {{ contentValue }}
    </sup>
  </div>
</template>

<script setup lang="ts" name="be-badge">
import { PropType, computed, defineExpose, defineProps } from 'vue'
import { isNumber } from '@be-ui/utils'

const props = defineProps({
  value: { // TODO TEST
    type: [String, Number],
    default: '',
  },
  type: { // TODO TEST
    type: String as PropType<'primary'|'success' |'info'|'warning'|'error'>,
    default: 'error',
  },
  show: { // TODO TEST
    type: Boolean,
    default: true,
  },
  max: { // TODO TEST
    type: Number,
    default: 100,
  },
  isDot: { // TODO TEST
    type: Boolean,
    default: false,
  },
})

const contentValue = computed<string>(() => {
  if (props.isDot) return ''
  if (isNumber(props.value) && isNumber(props.max))
    return props.max < props.value ? `${props.max}+` : `${props.value}`

  return `${props.value}`
})

defineExpose({
  contentValue,
})
</script>
