---
title: be-tooltip
lang: en-US
---

# be-tooltip 提示框

## 介绍

基于 `be-popover` 的封装，对于一些简单的文本类提示，可以使用这东西


## 演示

### 基本使用

:::demo 

tooltip/basic

:::

### 触发方式

:::demo 通过 `trigger` 来设置三种触发方式

tooltip/trigger

:::

### 去掉箭头

:::demo `raw` 能够让你去掉箭头

tooltip/raw

:::

### 自定义样式

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

tooltip/class

:::

### 手动定位

:::demo 传入 `x`、`y` 手动定位

tooltip/pos

:::

### 限制宽度

:::demo 传入 `width` 限制宽度

tooltip/width

:::

### 禁用

:::demo `disabled` 可以直接禁用

tooltip/disabled

:::

### 延时显示与消失

:::demo 传入 `delay` 和 `duration` 来实现延时显示与消失

tooltip/delay

:::

### 显示方向

:::demo 通过 `placement` 来设置显示方向,`'top' | 'right' | 'bottom' | 'left'`

tooltip/placement

:::



## Props

### tooltip-props

| 名称            | 类别         | 默认值     | 说明                                              |
|---------------|------------|---------|-------------------------------------------------|
| content       | `String`   | `-`     | `tooltip` 渲染内容 它会渲染到 `be-popover` 的 `slot` 默认插槽 |
| trigger       | `String`   | `hover` | 触发方式 `'hover' / 'click'/ 'manual'`              |
| disabled      | `Boolean`  | `false` | 禁用                                              |
| placement     | `String`   | `-`     | 显示方向 `'top' / 'right'/ 'bottom'/ 'left'`        |
| raw           | `Boolean`  | `true`  | 显示箭头                                            |
| customClass   | `String`   | `-`     | 自定义主题样式类                                        |
| x             | `Number`   | `-`     | 手动定位 `x`                                        |
| y             | `Number`   | `-`     | 手动定位 `y`                                        |
| width         | `Number`   | `-`     | 是否禁用                                         |
| duration      | `Number`   | `100`   | 延时关闭                                         |
| delay         | `Number`   | `100`   | 延时显示                                         |


## Slots

### tooltip-slot

| 名称          | 说明                                     |  
|-------------|----------------------------------------|
| slot        | 默认插槽，它会渲染到 `be-popover` 的 `trigger` 插槽 |



