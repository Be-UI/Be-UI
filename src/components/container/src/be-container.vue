<template>
  <section class="be-container" :class="{ 'be-container__vertical': isVertical }">
    <slot></slot>
  </section>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import type { Component, VNode } from 'vue'
  export default defineComponent({
    name: 'BeContainer',
    props: {
      direction: {
        type: String,
        default: '',
      },
    },
    setup(props, { slots }) {
      const isVertical = computed(() => {
        if (props.direction === 'vertical') {
          return true
        } else if (props.direction === 'horizontal') {
          return false
        }
        if (slots && slots.default) {
          const vNodes: VNode[] = slots.default()
          return vNodes.some(vNode => {
            const tag = (vNode.type as Component).name
            return tag === 'BeHeader' || tag === 'BeFooter'
          })
        } else {
          return false
        }
      })
      return {
        isVertical,
      }
    },
  })
</script>
