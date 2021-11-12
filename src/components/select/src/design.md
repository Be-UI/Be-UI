√ 整体禁用 disabled
√ 下拉按钮自定义图标 seletIcon
√ 三种尺寸
√ 可清空 clear
√ 选项分组 group
√ 选项禁用
√ 选项空白时显示内容
√ 未选择时内容
√ 定制回填内容
√ 动态选项增加
√ 选项搜索 search
√ 搜索排序
√ 加载中状态
√ 远程搜索
√ 自定义下拉模板
动态选项增加



點擊增加（下拉裏一開始就有的），下拉不復原

逗號分，詞增加自增tag，刪除自增tag或從下拉刪除自增，下拉勾選全部被清空
點擊下拉自增的，勾選錯誤

###多选项
支持多选 multiple
自动分词 （只在 tags 和 multiple 模式下可用。）
自定义选项tag
最大选择，自动收缩 maxTag
最大选择数 max
隐藏已选项 hideChoice
### 事件回調
√ onBlur	失去焦点时回调	function	-
√ onClear	清除内容时回调	function	-	4.6.0
√ openChange	展开下拉菜单的回调	function(open)	-
√ onFocus	获得焦点时回调	function	-
√ onMouseEnter	鼠标移入时回调	function	-
√ onMouseLeave	鼠标移出时回调	function	-
√ onSelect	被选中时调用，参数为选中项的 value (或 key) 值
√ onSearch	文本框值变化时回调	function(value: string)	- 在開啓搜索功能后，獲得搜索結果回調
√ scroll	下拉列表滚动时的回调	function	-
onChange	选中 option，或 input 的 value 变化时，调用此函数	function(value, option:Option | Array<Option>)	-
onDeselect	取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效	function(string | number | LabeledValue)	-

