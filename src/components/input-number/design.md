
三种尺寸 √  
禁用 √
自定义前后置组合渲染 √
受控超出边界变色
高精度小數

keyboard 是否启用键盘快捷行为
聚焦键盘上下建行为

输入校验
parser 字符串解析  
formatter 格式化
绑定值和显示值要分开维护

max	最大值
min	最小值
step 每次改变步数，可以为小数
onChange 变化回调 function(value: number | string | null)
onPressEnter 按下回车的回调 function(e)
onStep点击上下箭头的回调(value: number, info: { offset: number, type: 'up' | 'down' }) => void

blur()	移除焦点 √
focus()	获取焦点 √
select() 選中 √