√ 整体禁用 disabled √ 下拉按钮自定义图标 seletIcon √ 三种尺寸 √ 可清空 clear √ 选项分组 group √ 选项禁用 √ 选项空白时显示内容 √ 未选择时内容 √ 定制回填内容 √ 动态选项增加 √
选项搜索 search √ 搜索排序 √ 加载中状态 √ 远程搜索 √ 自定义下拉模板

### 多选项

### 事件回調

√ onBlur 失去焦点时回调 function - √ onClear 清除内容时回调 function - 4.6.0 √ openChange 展开下拉菜单的回调 function(open)    - √ onFocus
获得焦点时回调 function - √ onMouseEnter 鼠标移入时回调 function - √ onMouseLeave 鼠标移出时回调 function - √ onSelect 被选中时调用，参数为选中项的 value (
或 key) 值 √ onSearch 文本框值变化时回调 function(value: string)    - 在開啓搜索功能后，獲得搜索結果回調 √ scroll 下拉列表滚动时的回调 function - √ closeTag
多选下关闭tag的回调 function - √ onChange 选中 option，或 input 的 value 变化时，调用此函数 function(value, option:Option | Array<Option>)

- √ onDeselect 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 function(string | number | LabeledValue)    -

多选 be-select-multiple ；单选 be-select ；be-select-composition 是mixin 理论上多选和单选只有多选单选区别，其他props一样，需要写文档测试