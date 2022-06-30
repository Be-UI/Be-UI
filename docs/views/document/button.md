---
title: button
lang: en-US
---

# 图标

## 介绍

非常基础的组件，其实完全可以自己写。

## 演示

### 基本使用

:::demo 按钮内置了一些基础的样式类型。

button/basic

:::
### 圆角图标

:::demo 你可以通过 `round` 让它变得圆起来。

button/round

:::
### 不同大小

:::demo 内置了三种大小，可以通过 `size` 设置

button/size

:::
### 添加边框

:::demo 通过 `bordered` 来设置按钮边框

button/border

:::
### 边框虚线

:::demo 通过 `dashed` 来设置按钮虚线边框

button/dashed

:::
### 鬼起来

:::demo `ghost` 会让背景透明，你需要调整字体颜色

button/ghost

:::
### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

button/class

:::
### 前置与后置图标

:::demo 通过 `prevIcon` 和 `nextIcon` 来设置前置与后置图标

button/custom-icon

:::
### 载入中...

:::demo 当然我这里图标也可以 `loading` ,此时点击事件会被阻止

button/loading

:::
### 禁用

:::demo 禁用 `disabled`

button/disabled

:::

## Props

### button-props

| 名称            | 类别                   | 默认值              | 说明                                                                                         |
|---------------|----------------------|------------------|--------------------------------------------------------------------------------------------|
| size          | `String`             | `medium`         | 按钮大小 `'mini' \ 'medium' \ 'large' `                                                        |
| round         | `Number / String`    | `2`              | 按钮圆角                                                                                       |
| type          | `String`             | `default`        | 定义情感颜色 `default` \ `primary` \ `success`\ `info` \ `warning` \ `error`                     |
| bordered      | `Boolean`            | `false`          | 边框                                                                                         |
| ghost         | `Boolean`            | `false`          | 透明                                                                                         |
| dashed        | `Boolean`            | `false`          | 虚线                                                                                         |
| customClass   | `String`             | `-`              | 自定义样式类                                                                                     |
| flex          | `Boolean`            | `false`          | flex显示                                                                                     |
| disabled      | `Boolean`            | `false`          | 禁用                                                                                         |
| prevIcon      | `String`             | `-`              | 前置图标                                                                                       |
| nextIcon      | `String`             | `-`              | 后置图标                                                                                       |
| loading       | `Boolean`            | `false`          | `loading` 载入                                                                               |


## Slots

### button-slots

| 名称                            | 说明                       |  
|-------------------------------| ----------------------------|
| `slot`                        | 就是普通插槽                  |
