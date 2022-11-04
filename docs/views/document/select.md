---
title: be-select
lang: en-US
---

# be-select 开关

## 介绍

没啥好说。。就一个下拉框


## 演示

### 基本使用

:::demo 内置了三种尺寸，通过 `size` 设置 `mini` | `medium` | `large`

select/basic

:::





### 不同情感类型

:::demo 内置了六种类型，通过 `type` 设置 `default` | `primary` | `success` | `info` | `warning` | `error`

tag/type

:::

### 禁用

:::demo `disabled` 可以禁用你的 `tag`

tag/disabled

:::

### 开启圆角

:::demo 你可以通过 `round` 让它变得圆起来。

tag/round

:::

### 可关闭的 `tag`
:::warning
这里只实现了事件触发，真正的删除你还是通过数据维护
:::

:::demo `isClose` 可以开启关闭图标，并通过传入 `close` 事件来完成回调

tag/close

:::

### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

tag/class

:::

### 开启样式配置

:::demo 通过 `option` 来传入可以直接修改边框、背景、圆角、字体

tag/style

:::


## Props

### select-props

| 名称          | 类别                 | 默认值      | 说明                               |
|-------------|--------------------|----------|----------------------------------|
| size        | `String`           | `medium` | 尺寸 `'small' / 'medium'/ 'large'` |
| disabled    | `Boolean`          | `false`  | 禁用                               |
| customClass | `String`           | `-`      | 自定义主题样式类                         |
| modelValue  | `String / Object`  | `-`      | 绑定值                              |
| labelValue  | `String`           | `label`  | 下拉列表的显示字段                        |
| list        | `Array`            | `[]`     | 数据列表                             |
| keyValue    | `String`           | `id`     | 下拉列表的的键名                         |
| placeholder | `String`           | `请选择`  | 输入框占位文本                          |
| clear       | `Boolean`          | `false`  | 是否可以清除                           |
| selectIcon  | `String`           | `under`  | 下拉图标                             |
| group       | `Boolean`          | `false`  | 开启分组                             |
| extend      | `Boolean`          | `false`  | 动态扩展                             |
| search      | `Boolean`          | `false`  | 开启搜索匹配                           |
| searchFunc  | `Function`         | `-`      | 搜索匹配方法                           |
| sortFunc    | `Function`         | `-`      | 搜索排序方法                           |
| remote      | `Boolean`          | `false`  | 开启远程搜索                           |
| remoteFunc  | `Function`         | `-`      | 远程搜索方法                           |


## Emits

### select-emit

| 名称           | 参数                                             | 说明          |
|--------------|------------------------------------------------|-------------|
| blur         | 事件对象 `event`                                 | 失焦事件        |
| focus        | 事件对象 `event`                                 | 聚焦事件        |
| clear        | `-`                                            | 清除方法        |
| select       | (点击对象数据 `Object`, 点击的对应列表索引 `index`)  | `select` 事件 |
| openChange   | 下拉展开状态 `showPopover`                        | 清除方法        |
| search       | 搜索结果 `filterRes: Array`                      | 清除方法        |
| MouseEnter   | 事件对象 `event`                                 | 鼠标移入        |
| MouseLeave   | 事件对象 `event`                                 | 鼠标移出        |
| scroll       | `-`                                            | `scroll` 滚动事件 |

## Slots

### select-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |




