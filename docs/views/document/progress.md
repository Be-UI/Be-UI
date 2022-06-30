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

## Props

### progress-props

| 名称            | 类别                           | 默认值                                                      |  说明                                                                                                  |
| -------------- | ---------------------------- | -----------------------------------------------------------| -------------------------------------------------------------------------------------------------------|
| percent        | `Number`                     | `0`                                                        | 百分比                                                                                                 |
| showInfo       | `Boolean`                    | `true`                                                     | 是否显示进度数值                                                                                         |
| status         | `String`                     | `normal`                                                   | 状态 `success` \ `error` \ `normal`                                                                    |
| success        | `Object`                     | `-`                                                        | 成功进度条配置 `{ percent: number, strokeColor: string }`,颜色和百分比独立于 `color`，`status` 和 `percent`  |
| trailColor     | `String`                     | `-`                                                        | 未完成的分段的颜色                                                                                       |
| strokeLinecap  | `String`                     | `round`                                                    | 进度条的圆角样式 `round` \ `square`                                                                     |
| type           | `String`                     | `line`                                                     | 类型 `line` \ `circle` \ `dashboard`                                                                  |
| color          | `String  / Object`           | `line`                                                     | 进度条的色彩；传入`{ to: number, from: string }`可实现渐变，仅支持 `type = 'line'`；优先级高于 `status`       |
| strokeWidth    | `Number`                     | `type = 'line' 时为10，type = 'circle'或 'dashboard' 时为10` | 进度条的宽度                                                                                           |
| width          | `Number`                     | `132`                                                      | 进度条画布宽度,仅支持 `type = 'dashboard'` 和 `type = 'circle'`                                         |
| gap            | `Number`                     | `75`                                                       | 仪表盘进度条缺口大小,可取值 `0 ~ 100`,仅支持 `type = 'dashboard'`                                         |
| gapPosition    | `String`                     | `bottom`                                                   | 仪表盘进度条缺口位置 `top` \ `bottom` \ `left` \ `right`                                                |


## Slots

### progress-slots

| 名称                            | 说明                                                                        |  
| ----------------------------   | ---------------------------------------------------------------------------|
| `default`                      | 默认插槽，自定义渲染百分比显示部分内容，仅 `type = 'line'` 时有效                   |
| `center`                       | 自定义渲染百分比显示部分内容，仅 `type = 'circle'` 或 `type = 'dashboard'` 时有效 |

