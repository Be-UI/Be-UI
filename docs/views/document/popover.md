---
title: be-popover
lang: en-US
---

# 弹出框

## 介绍

这是基于 `popover.js` 的弹出框组件。

## 演示

### 基本使用

:::demo

popover/basic

:::

### 触发方式

:::demo 通过 `trigger` 来设置三种触发方式

popover/trigger

:::

### 箭头去除

:::demo `raw` 能够让你去掉箭头

popover/raw

:::

### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

popover/class

:::

### 自定义现实位置

:::demo 传入 `x`、`y` 手动定位

popover/xAndY

:::

### 宽度限制

:::demo 传入 `width` 限制宽度

popover/width

:::

### 禁用

:::demo `disabled` 可以禁用你的 `popover`

popover/disabled

:::

### 延迟显示与关闭

:::demo 传入 `delay` 和 `duration` 来实现延时显示与消失

popover/delay

:::

### 四种显示方向

:::demo 通过 `placement` 来设置显示方向 `top` | `right` | `bottom` | `left`

popover/placement

:::

## Props

### popover-props

| 名称          | 类别       | 默认值    | 说明                                        |
|--------------|------------|---------|-------------------------------------------|
| trigger      | `String`   | `hover` | 触发方式 `'hover' / 'click'/ 'manual'`        |
| placement    | `String`   | `top`   | 显示方向 `'top' / 'right'/ 'bottom'/ 'lefts'` |
| raw          | `Boolean`  | `true`  | 是否显示箭头                                    |
| x            | `Number`   | `-`     | 手动定位`x`坐标                                 |
| y            | `Number`   | `-`     | 手动定位`y`坐标                                 |
| customClass  | `String`   | `-`     | 自定义主题样式类                                  |
| width        | `Number`   | `-`     | 限制宽度                                      |
| disabled     | `Boolean`  | `false` | 是否禁用                                      |
| delay        | `Number`   | `100`   | 延迟显示                                      |
| duration     | `Number`   | `100`   | 延迟关闭                                      |

## Slots

### popover-slot

| 名称                | 说明                     |  
|-------------------|------------------------|
| trigger           | popover 的触发元素          |
| slot              | 默认插槽，是 popover 的浮窗内容  |