/* * be-input-select.vue * @deprecated 远程搜索的下拉框 * @author czh * @create (czh 2021/5/31) *
@update (czh 2021/6/2) */
<template>
  <transition name="be-zoom-in-top">
    <div :id="`be_input_select${uid}`" class="be-input-select" :style="selectStyle">
      <ul
        v-show="!loading"
        v-if="list.length > 0"
        :id="`be_input_select_ul${uid}`"
        :key="`be_input_select_ul${uid}`"
        :style="selectStyle">
        <li
          v-for="(item, index) in list"
          :key="item[keyValue]"
          class="be-input-select__inner"
          @click="handleSelect(item, index)">
          <slot name="cus-temp" :item="item">
            {{ item[labelValue] }}
          </slot>
        </li>
      </ul>
      <!--   载入中     -->
      <ul v-show="loading" :key="`be-input-select${uid}-loading`">
        <li class="be-input-select__line"></li>
        <li class="be-input-select__inner" style="text-align: center">载入中...</li>
      </ul>
      <!--   无数据     -->
      <ul v-show="loading && list.length === 0" :key="`be-input-select${uid}-loading`">
        <li class="be-input-select__inner">暂无数据</li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance } from 'vue'
  import { IInputInst } from '../../input/src/be-input-type'

  export default defineComponent({
    name: 'BeInputSelect',
    props: {
      /**
       * 数据列表
       */
      selectList: {
        type: Object,
        default: () => {
          return {}
        },
      },
      /**
       * 输入建议样式
       */
      selectStyle: {
        type: Object,
        default: () => {
          return { left: '0px', top: '0px' }
        },
      },
      /**
       * 是否显示
       */
      isShow: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否显示 loading
       */
      loading: {
        type: Boolean,
        default: false,
      },
      /**
       * key
       */
      keyValue: {
        type: String,
        default: 'id',
      },
      /**
       * label
       */
      labelValue: {
        type: String,
        default: 'label',
      },
    },
    emits: ['select'],
    setup(props, ctx) {
      const internalInstance = getCurrentInstance() as IInputInst
      /**
       * 下拉搜索选择事件方法
       * @param {String} value - 更新后值
       * @param {Number} index - 点击索引
       */
      const handleSelect = (value: string, index: number): void => {
        ctx.emit('select', value, index)
      }
      const list = computed(() => {
        return props.selectList
      })
      return {
        uid: internalInstance.uid,
        handleSelect,
        list,
      }
    },
  })
</script>
