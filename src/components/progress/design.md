### props

属性	说明	类型	默认值

ing....   percent	百分比	number	0
ing....   showInfo	是否显示进度数值或状态图标	boolean	true
ing....   status	状态，可选：success error normal
ing....   success	成功进度条相关配置	{ percent: number, strokeColor: string } 
ing....   color	进度条的色彩	string	- (颜色优先级最高！！！！！！！！！！！！！！！！)
ing....   strokeLinecap	进度条的样式	round | rect	round
ing....   trailColor	未完成的分段的颜色	string	-
ing....   type	类型，可选 line circle dashboard	string	line


#### type="line"#
属性	说明	类型	默认值
steps	进度条总共步数	number	-
√ strokeWidth	进度条线的宽度，单位 px	number	10


#### type="circle"#
属性	说明	类型	默认值
strokeColor	圆形进度条线的色彩，传入 object 时为渐变	string | object	-
strokeWidth	圆形进度条线的宽度，单位是进度条画布宽度的百分比	number	6
width	圆形进度条画布宽度，单位 px	number	132
#### type="dashboard"#
属性	说明	类型	默认值
gapDegree	仪表盘进度条缺口角度，可取值 0 ~ 295	number	75
gapPosition	仪表盘进度条缺口位置	top | bottom | left | right	bottom
strokeWidth	仪表盘进度条线的宽度，单位是进度条画布宽度的百分比	number	6
width	仪表盘进度条画布宽度，单位 px	number	132
### slot


√   line- 'right (默认百分比值)'
circle | dashboard- 'center (默认百分比值)'  

