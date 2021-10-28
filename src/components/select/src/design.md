1.整体禁用 disabled √
2.选项搜索 search
3.下拉按钮自定义图标 seletIcon
4.三种尺寸 √
5.可清空 clear
7.选项分组 group
8.动态选项增加 
9.隐藏已选项 hideChoice
10.最大选择，自动收缩 maxTag
11，最大选择数 max
12 选项禁用 
13.远程搜索
16.定制回填内容
17.搜索排序
18.加载中状态
19.选项空白时显示内容
20.未选择时内容
21.清除按钮自定义图标 seletIcon

###多选项
支持多选 multiple
自动分词 （只在 tags 和 multiple 模式下可用。）
自定义选项tag
### 事件回調
onBlur	失去焦点时回调	function	-
onChange	选中 option，或 input 的 value 变化时，调用此函数	function(value, option:Option | Array<Option>)	-
onClear	清除内容时回调	function	-	4.6.0
onDeselect	取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效	function(string | number | LabeledValue)	-
onDropdownVisibleChange	展开下拉菜单的回调	function(open)	-
onFocus	获得焦点时回调	function	-
onInputKeyDown	按键按下时回调	function	-
onMouseEnter	鼠标移入时回调	function	-
onMouseLeave	鼠标移出时回调	function	-
onPopupScroll	下拉列表滚动时的回调	function	-
onSearch	文本框值变化时回调	function(value: string)	-
onSelect	被选中时调用，参数为选中项的 value (或 key) 值