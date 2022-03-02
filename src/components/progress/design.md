### props

属性	说明	类型	默认值

√ tested percent	百分比	number	0
√ tested showInfo	是否显示进度数值或状态图标	boolean	true
√ tested status	状态，可选：success error normal
  success	成功进度条相关配置	{ percent: number, strokeColor: string } 
  color	进度条的色彩	string	- (颜色优先级最高！！！！！！！！！！！！！！！！)
√ tested strokeLinecap	进度条的样式	round | rect	round
√ tested trailColor	未完成的分段的颜色	string	-
  type	类型，可选 line circle dashboard	string	line


#### type="line"#
属性	说明	类型	默认值
	圆形进度条线的色彩，传入 object 时为渐变	string | object	-
√ tested strokeWidth	圆形进度条线的宽度，单位是进度条画布宽度的百分比	number	10



#### type="circle"#
属性	说明	类型	默认值

√ tested strokeWidth	圆形进度条线的宽度，单位是进度条画布宽度的百分比	number	6
√ width	圆形进度条画布宽度，单位 px	number	132
√ percent	百分比	number	0
√ tested showInfo	是否显示进度数值或状态图标	boolean	true
√ tested status	状态，可选：success error normal
√ success	成功进度条相关配置	{ percent: number, strokeColor: string }
√ tested color	进度条的色彩	string	- (颜色优先级最高！！！！！！！！！！！！！！！！)
√ tested strokeLinecap	进度条的样式	round | square	round
√ tested trailColor	未完成的分段的颜色	string	-




#### type="dashboard"#
属性	说明	类型	默认值
√ gap 仪表盘进度条缺口大小，可取值 0 ~ 100	number	75
√ gapPosition	仪表盘进度条缺口位置	top | bottom | left | right bottom
√ tested strokeWidth	圆形进度条线的宽度，单位是进度条画布宽度的百分比	number	6
√ width	圆形进度条画布宽度，单位 px	number	132
√ percent	百分比	number	0
√ tested showInfo	是否显示进度数值或状态图标	boolean	true
√ tested status	状态，可选：success error normal
√ success	成功进度条相关配置	{ percent: number, strokeColor: string }
√ tested color	进度条的色彩	string	- (颜色优先级最高！！！！！！！！！！！！！！！！)
√ tested strokeLinecap	进度条的样式	round | square	round
√ tested trailColor	未完成的分段的颜色	string	-
### slot


√   line- 'right (默认百分比值)'
circle | dashboard- 'center (默认百分比值)'  


bug
width的显示不全
strokeWidth的显示不全