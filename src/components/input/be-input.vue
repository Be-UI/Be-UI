/*
* be-input.vue
* @deprecated 带输入建议远程搜索的输入框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
  <div class="be-input" v-click-outside="closeDisplay" :class="customClass">
    <div class="be-input-body" :class="expandStyle">
      <!-- @slot 前置插槽-->
      <slot name="preSlot"></slot>
      <!--这里应该用自己封在icon组件，code在公司，先暂时用element-->
      <i @click="handleIcon" :class='`el-icon-${nextIcon}`' class="be-input-preIcon" v-if="preIcon"></i>
      <input
          :disabled="disabled"
          :readonly="readonly"
          :type="handleInputType"
          :placeholder="placeholder"
          :value="value"
          :maxlength="maxLen"
          @input="handleInput($event.target.value)"
          @blur="handleBlur($event.target.value)"
          @focus="handleFocus($event.target.value,$event)"
          class="be-input__inner">
      <i @click="handleIcon" :class='`el-icon-${nextIcon}`' class="be-input-nextIcon" v-if="nextIcon"></i>
      <!--清除按钮-->
      <i @click="handleClear" class="el-icon-close be-input-close" v-show="clearable"></i>
      <!--建议输入下拉框-->
      <be-input-select
          @select="handleSelect"
          :select-style="selectStyle"
          :select-list="selectList"
          :is-show="isShowSelect">
      </be-input-select>
      <!-- @slot 后置插槽-->
      <slot name="nextSlot"></slot>
    </div>
  </div>
</template>

<script>
/**
 * 带输入建议远程搜索的输入框
 */
import BeInputSelect from "./be-input-select";

export default {
  name: "BeInput",
  components: {BeInputSelect},
  data() {
    return {
      // 输入建议显示
      isShowSelect: false,
      // 输入建议数据列表
      selectList: {data: [], label: '', keyName: ''},
      // 输入建议数据列表缓存
      selectListCache: {data: [], label: '', keyName: ''},
      // 输入建议数据列表
      selectStyle: {left: '0px', top: '0px'},
      // 输入建议loading标志
      loading: false,
      // 输入建议展开时，input样式
      expandStyle: '',
      // 输入建议数据列表最大显示长度
      maxStrLen: 0,
      // 事件触发dom
      eventDom: null

    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * 绑定值
     */
    value: [String, Number],
    /**
     * 输入框占位文本
     */
    placeholder: String,
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 是否只读
     */
    readonly: Boolean,
    /**
     * 输入框类型
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * 自定义样式
     */
    customClass: {
      type: String,
      default: ''
    },
    /**
     * 是否可以清除
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示密码
     */
    showPassword: {
      type: Boolean,
      default: false
    },
    /**
     * 最大长度限制
     */
    maxLen: {
      type: Number,
      default: null
    },
    /**
     * 最小长度限制
     */
    minLen: {
      type: Number,
      default: null
    },
    /**
     * 输入建议方法
     */
    fetchSuggestions: {
      type: Function,
      default: null
    },
    /**
     * 前置icon类型
     */
    preIcon: {
      type: String,
      default: ''
    },
    /**
     * 后置icon图标类型
     */
    nextIcon: {
      type: String,
      default: ''
    },
  },
  computed: {
    // 根据传入计算input类型
    handleInputType() {
      // 显示密码
      if (this.type === 'password' && this.showPassword) {
        return 'text'
      }
      return this.type
    },
  },
  watch: {
    // 监听value变化，触发change
    value(nVal, oVal) {
      // 处理最小长度
      if (this.minLen && this.minLen !== 0) {
        let values = this.value
        let isNum = false
        // 现将数字转化为字符串判断长度
        if (Object.prototype.toString.call(this.value) === '[object Number]') {
          values = this.value.toString()
          isNum = true
        }
        if (values.length <= this.minLen) {
          if (nVal && !oVal) values = isNum ? Number(nVal) : nVal
          if (!nVal && oVal) values = isNum ? Number(oVal) : oVal
          this.$emit('input', values)
        }
      }
      this.handleChange(nVal, oVal)
    },
  },
  methods: {
    /**
     * change 事件处理方法
     * @param {String | Number} nVal - 更新后值
     * @param {String | Number} oVal - 更新前值
     */
    handleChange(nVal, oVal) {
      /** 输入change事件
       * @event change
       * @param {String | Number} nVal - 更新后值
       * @param {String | Number} nVal - 更新前值
       */
      this.$emit('change', nVal, oVal)
    },
    /**
     * input 事件处理方法，实现双向绑定
     * @param {String | Number} val - 更新后值
     */
    handleInput(val) {
      const _this = this
      // 根据输入值处理输入建议
      if (val === '') {
        this.getSuggestions(val)
      } else {
        let arr = []
        this.selectList.data = []
        this.selectListCache.data.forEach(res => {
          if (res[_this.selectListCache.label].indexOf(val) >= 0) {
            arr.push(res)
          }
        })
        this.$set(this.selectList, 'data', arr)
      }
      this.$emit('input', val)
    },
    /**
     * blur 事件处理方法
     * @param {String | Number} value - 更新后值
     */
    handleBlur(value) {
      this.expandStyle = ''
      /** 输入 blur 事件
       * @event blur
       * @param {String | Number} value - 输入框值
       */
      this.$emit('blur', value)
    },
    /**
     * 关闭输入建议下拉框，方法由指令v-click-outside调用
     */
    closeDisplay() {
      this.isShowSelect = false
    },
    /**
     * focus 事件处理方法
     * @param {String | Number} value - 更新后值
     * @param {Event} event - 事件对象
     */
    handleFocus(value, event) {
      const $eventDom = event.target.parentElement
      this.eventDom = $eventDom
      // 触发输入建议回调方法，获取下拉列表数据
      if (Object.prototype.toString.call(this.fetchSuggestions) === '[object Function]') {
        this.loading = true
        this.getSuggestions(value)
        // 设置显示位置,宽度
        this.computedPositon($eventDom)
        this.isShowSelect = true
      }
      /** 输入 focus 事件
       * @event focus
       * @param {String | Number} value - 输入框值
       */
      this.$emit('focus', value)
    },
    /**
     * 获取输入建议
     * @param {String | Number} value - 更新后值
     */
    getSuggestions(value) {
      this.fetchSuggestions(value, (data, label, keyName) => {
        // 设置输入建议数据
        this.selectList = {data, label, keyName}
        this.selectListCache = JSON.parse(JSON.stringify(this.selectList))
        this.loading = false
      })
    },
    /**
     * 下拉搜索选择事件方法
     * @param {String | Number} value - 更新后值
     * @param {Number} index - 点击索引
     */
    handleSelect(value, index) {
      /** 输入建议选中 select 事件
       * @event select
       * @param {Object} value - 点击对象数据
       * @param {Number} index - 点击的对应列表索引
       */
      this.$emit('select', value, index)
      this.closeDisplay()
    },
    /**
     * 输入框内容清除方法
     * @public
     */
    handleClear() {
      this.$emit('input', '')
    },
    /**
     * 输入框前后icon点击方法
     */
    handleIcon() {
      /** 输入建议选中 iconClick 事件
       * @event iconClick
       * @param {String | Number} value - 输入框值
       */
      this.$emit('iconClick', this.value)
    },
    /**
     * 计算输入建议下拉框位置
     * @param {Element} $eventDom - 输入建议下拉框dom
     */
    computedPositon($eventDom) {
      if(!$eventDom)return
      this.selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
      this.selectStyle.top = $eventDom.getBoundingClientRect().top + Number(window.getComputedStyle($eventDom).height.split('px')[0]) + 2 + 'px'
      this.selectStyle.left = $eventDom.getBoundingClientRect().left + 'px'
      this.expandStyle = this.expandStyle + 'be-input-body__expand'
    }
  },
  mounted() {
    window.onresize = () => {
      const $eventDom = this.eventDom
      // 设置显示位置,宽度
      this.computedPositon($eventDom)
    }

  },
  beforeDestroy() {
    this.eventDom = null
    window.onresize = null
  }
}
</script>

<style lang='scss'>
@import 'src/assets/style/be-input';

</style>
