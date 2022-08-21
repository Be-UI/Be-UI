/*
 * @be-select-composition.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/11/12)
 */
import { ref, computed, getCurrentInstance, reactive, useAttrs, nextTick } from 'vue'
import { IOption, ISelect } from './be-select-type'
import { IInputSelectFunc } from '../../autocomplete/src/be-autocomplete-type'
import { getUuid, isFunction } from '@be-ui/utils/common'

export default (props: any, ctx: any) => {
  // 當前實例
  const internalInstance = getCurrentInstance() as ISelect
  // 當前實例uid
  const uid = internalInstance.uid
  // 下拉數據列表
  const dataList = ref<Array<any>>([])
  // 下拉數據列表監聽
  const list = computed(() => {
    return props.list
  })
  // 列表緩存
  const listCache: Array<any> = []

  /**************************************** 樣式相關處理 ************************************/
  // 只读
  const readonlyInput = ref<boolean>(true)
  if (props.search) {
    readonlyInput.value = false
  }
  // cursor 的样式
  const cursor = props.disabled ? 'not-allowed' : readonlyInput.value ? 'pointer' : ''
  // 输入建议下拉样式
  const selectStyle = reactive({ width: '0px' })
  /**
   * 计算输入建议下拉框位置
   */
  const computedPosition = (): void => {
    const $eventDom: HTMLElement | null = document.getElementById(`be-select--body${uid}`)
    if (!$eventDom) return
    selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
  }
  /**
   * 更新popover
   */
  const updatePopover = (): void => {
    const curInstPopover = internalInstance.refs.beSelectPopover as IInputSelectFunc
    curInstPopover.computePosition(null, 'update')
  }
  /**************************************** 各種事件方法 ************************************/
  // 當前實例屬性attr
  const curAttrs = useAttrs()
  // 圖標類型
  const iconType = ref<string>(computed(() => props.selectIcon).value)
  const focusClass = ref<string>('')
  /**
   * focus 事件处理方法
   * @param {Event} event - 事件对象
   */
  const handleFocus = (event: Event): void => {
    (event.target as HTMLInputElement).querySelector('input')?.focus()
    /** focus 事件
     * @event focus
     * @param {Event} event - 事件对象
     */
    ctx.emit('focus', event)
  }
  /**
   * blur 事件处理方法
   * @param {Event} event - 事件对象
   */
  const handleBlur = (event: Event): void => {
    /** 输入 blur 事件
     * @event blur
     * @param {Event} event - 事件对象
     */
    ctx.emit('blur', event)
  }
  /**
   * 下拉列表展開關閉方法
   * @param {Boolean} showPopover - popover展開狀態
   */
  const selectOpenChange = (showPopover: boolean): void => {
    if (showPopover) {
      focusClass.value = 'be-select--body__focus'
    } else {
      focusClass.value = ''
    }
    // 增加滾動監聽
    if (showPopover && curAttrs.onScroll) {
      nextTick(() => {
        const dom = document.getElementById(`be_select_option_container_${uid}`)
        dom?.addEventListener('scroll', handleScroll)
      })
    }
    /** 输入 openChange 事件
     * @event blur
     * @param {Boolean} showPopover - popover展開狀態
     */
    ctx.emit('openChange', showPopover)
  }
  /**
   * 修改圖標方法。鼠標移入 變成清除圖標
   * @param {String} type - 圖標類型
   */
  const changeIcon = (type: string | undefined): void => {
    if (props.clear && props.modelValue) {
      iconType.value = type || 'error'
      return
    }
  }
  /**
   * 處理鼠標移入
   * @param {Event} event - 事件对象
   */
  const handleMouseEnter = (event: Event): void => {
    changeIcon(undefined)
    /** MouseEnter 事件
     * @event MouseEnter
     * @param {Event} event - 事件对象
     */
    ctx.emit('MouseEnter', event)
  }
  /**
   * 處理鼠標移出
   * @param {Event} event - 事件对象
   */
  const handleMouseLeave = (event: Event): void => {
    changeIcon(props.selectIcon)
    /** MouseLeave 事件
     * @event MouseLeave
     * @param {Event} event - 事件对象
     */
    ctx.emit('MouseLeave', event)
  }
  /**
   * 滾動方法
   */
  const handleScroll = (): void => {
    /** scroll滚动 事件
     * @event scroll
     * @param {Event} event - 事件对象
     */
    ctx.emit('scroll')
  }
  /**
   * 滾動條事件監聽方法
   */
  const addScrollEvt = (): void => {
    const dom = document.getElementById(`be_select_option_container_${uid}`)
    dom?.addEventListener('scroll', handleScroll)
  }
  /**************************************** 擴展渲染選項方法 ************************************/
  // 新增的下拉選項數據
  const addItem = ref<string>('')
  /**
   * 新增的下拉選項數據賦值方法
   * @param {String} value - 新增選項值
   */
  const handleInput = (value: string): void => {
    addItem.value = value
  }
  /**
   * 新增選綫組裝，並加入到列表中
   */
  const addItemToList = (): void => {
    if (addItem.value) {
      const item: IOption = {}
      const keyValue = props.keyValue || 'id'
      const labelValue = props.labelValue || 'label'
      item[keyValue] = getUuid()
      item[labelValue] = addItem.value
      dataList.value.push(item)
      addItem.value = ''
    }
  }
  /**************************************** 輸入匹配建議相關方法 ************************************/
  // 远程时设置为不触发，由input事件内手动渲染
  const trigger = ref<string>('click')
  if (props.remote && isFunction(props.remoteFunc)) {
    trigger.value = 'none'
  }
  // loading顯示標識
  const loading = ref<boolean>(false)
  const addItemList = ref<Array<any>>([])
  return {
    internalInstance,
    uid,
    dataList,
    list,
    listCache,
    readonlyInput,
    cursor,
    selectStyle,
    iconType,
    trigger,
    loading,
    addItemList,
    addItem,
    handleInput,
    addItemToList,
    computedPosition,
    updatePopover,
    addScrollEvt,
    handleScroll,
    handleMouseLeave,
    handleMouseEnter,
    selectOpenChange,
    handleBlur,
    handleFocus,
    changeIcon,
    focusClass,
  }
}
