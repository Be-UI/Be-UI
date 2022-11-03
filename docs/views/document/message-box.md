---
title: be-message-box
lang: en-US
---

# be-message-box 信息对话盒子

## 介绍

`Be-Message-Box`,你必须传一个 `bodyRender` 来确定你渲染的内容


## 演示

### 基本使用

:::demo 内置了四中类型，通过 `type` 设置 `success` | `info` | `warning` | `error`

message-box/basic

:::

### 拖拽使用

:::warning

注意：`isDrag` 范围是根据 `body` 来定位的，你需要给 `body` 设置宽高。

:::

:::demo 你可以通过设置 `isDrag` 来让它可以拖拽

message-box/drag

:::

### 关闭背景蒙层

:::demo `isOpenModal` 关闭背景蒙层

message-box/modal

:::

### 自定义样式
:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

message-box/class

:::

### 底部对齐布局

:::demo `footerType` 来让底部靠右

message-box/layout

:::

### 事件回调

:::demo `onClose` 关闭事件 与 `onConfirm` 确认事件

message-box/event

:::

### 自定义渲染

:::demo 自定义渲染分为 `footerRender` 底部渲染，`iconPreRender` 标题前置图标渲染，`iconNextRender` 标题后置图标渲染,`bodyRender` 主体自定义渲染

message-box/custom

:::



## Props

### tag-props

| 名称             | 类别                            | 默认值        | 说明                                           |
|----------------|-------------------------------|------------|----------------------------------------------|
| titles         | `String`                      | `-`        | 标题                                           |
| isDrag         | `Boolean`                     | `false`    | 是否拖拽                                         |
| isShow         | `Boolean`                     | `false`    | 是否显示                                         |
| isOpenModal    | `Boolean`                     | `false`    | 是否开启遮罩蒙层                                     |
| msgType        | `String`                      | `info`     | 类型  `'success'/ 'info' / 'warning'/ 'error'` |
| customClass    | `String`                      | `-`        | 自定义主题样式类                                     |
| footerType     | `String`                      | `center`   | 底部对齐类型 `right / center`                      |
| footerRender   | `Function:JSX / TSX / null`   | `-`        | 底部自定义渲染                                      |
| bodyRender     | `Function:JSX / TSX / null`   | `-`        | 主体自定义渲染                                      |
| iconPreRender  | `Function:JSX / TSX / null`   | `-`        | 标题前置图标渲染                                     |
| iconNextRender | `Function:JSX / TSX / null`   | `-`        | 关闭图标渲染                                       |


