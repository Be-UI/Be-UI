---
title: be-progress
lang: en-US
---

# be-progress 进度条

## 介绍

一个简单的进度条，包括环形进度条和条形进度条

## 演示

### 基本使用

:::demo 这里通过 `status` 给进度条定义了三种状态

progress/basic

:::

### 百分比显示与自定义

:::demo 这里通过 `showInfo` 来关闭百分比显示，而默认插槽能够自定义渲染内容。

progress/slot-percent

:::

### 方与圆角

:::demo `strokeLinecap` 可以让你的进度条方起来

progress/round-square

:::

### 环形与条形

:::demo `type` 来进行实现环形进度条与仪表

progress/circle

:::

### 环形与条形

:::warning

注意：success 配置后颜色和百分比将不受 percent 和 color控制

:::

:::demo `success` 来进行配置甚至可以同他来实现进度条的分段效果

progress/success

:::

### 进度条颜色与轨道颜色

:::warning

注意：`color` 颜色设置的优先级将高于 `status` 状态和 `100%` 时颜色( `be-progress` 默认当你传入 `percent=100` 时，自动切入为成功状态 显示为绿色。)

:::

:::demo `color` 和 `trailColor` 能够分别定义进度条颜色与轨道颜色

progress/trail-color

:::

:::demo 此外，当你类型 `type = 'line'` 时，还可以传入一个对象来实现进度条渐变

progress/linear-gradient

:::

## Cascader Events

| Event Name     | Description                                         | Parameters                                    |
| -------------- | --------------------------------------------------- | --------------------------------------------- |
| change         | triggers when the binding value changes             | value                                         |
| expand-change  | triggers when expand option changes                 | an array of the expanding node's parent nodes |
| blur           | triggers when Cascader blurs                        | (event: Event)                                |
| focus          | triggers when Cascader focuses                      | (event: Event)                                |
| visible-change | triggers when the dropdown appears/disappears       | true when it appears, and false otherwise     |
| remove-tag     | triggers when remove tag in multiple selection mode | the value of the tag which is removed         |