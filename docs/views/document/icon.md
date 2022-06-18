---
title: be-icon 
lang: en-US
---

# be-icon 图标

## 介绍

这是基于 `SVG` 的图标。

## 演示

### 基本使用

:::demo 通过 `icon` 来设置图标。

icon/basic

:::

### 宽高设置

:::demo 通过 `width` 和 `height` 来直接设置宽高

icon/size

:::

### 颜色自定义

:::demo 通过 `color` 来设置颜色

icon/color

:::

### 让它转起来！

:::demo 通过 `spin` 来开启图标旋转

icon/spin

:::

### 样式覆盖哦吼~

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

icon/custom-class

:::

### 有趣的图标

:::demo 使用 `BeIconComponets` 来实现自定义图标

icon/custom-icon

:::

### 所有图标

:::demo

icon/all-icon

:::

## Props

### icon-props

| 名称            | 类别                                                 | 默认值                                         |  默认值                                        |
| -------------- | --------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| width          | `Number or String`                                   | `18`                                            | 自定义宽                                       |
| height         | `Number or String`                                   | `18`                                            | 自定义宽                                       |
| color          | `String`                                            | `-`                                            | 定义颜色                                        |
| icon           | `String`                                            | `-`                                            | `icon` 名称                                      |
| spin           | `Boolean`                                           | `false`                                        | 是否旋转                                        |
| customClass    | `String`                                            | `-`                                            | 自定义主题样式类                                  |


## Public Function

### icon-function

| 名称                           | 参数                                                 | 说明                                         |  
| ----------------------------  | --------------------------------------------------- | --------------------------------------------- |
| `createFromIconfontCN`          | `url:String` `iconfont` 图标的地址                    | 加载 `iconfont` 图标                           |
