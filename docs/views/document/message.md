---
title: be-message
lang: en-US
---

# message 开关

## 介绍

它是基于 `notification` 的一层封装罢了。


## 演示

### 基本使用

:::demo 内置了一些基础的样式类型。你可以通过 `msgType` 来设置, `success` | `info` | `warning` | `error`

message/basic

:::

### 纵向偏移

:::demo `offsetTop` 可以自定义你需要的偏移量

message/top

:::

### 可关闭的 message
:::warning

注意：点击下方按钮来看看是啥,关闭后打开F12看看回调。

:::
:::demo 你可以通过 `close` 让 `message` 可以关闭，`onClose` 则可以传入指定的关闭回调

message/close

:::

### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

message/class

:::

### message 内容更新

:::demo 通过传入 `key` 标记 `message` 来实现文本更新

message/update

:::

### 自定义前置内容

:::demo 通过 `iconPreRender` 来自定义前置元素内容

message/preRender

:::

### 自定义关闭元素内容

:::demo 通过 `closeRender` 来自定义关闭元素内容

message/closeRender

:::

### 带有 loading 的 message
:::warning

注意：需要配合 `props` 的 `key` 使用

:::
:::demo 通过 `loading` 来让 `message` 进入 `loading` 显示

message/loading

:::


## Props

### message-props

| 名称              | 类别          | 默认值      | 说明                                           |
|-----------------|-------------|----------|----------------------------------------------|
| titles          | `String`    | `-`      | 文本内容                                         |
| msgType         | `String`    | `info`   | 尺寸 `'success'/ 'info' / 'warning'/ 'error'`  |
| offsetTop       | `Number`    | `-`      | 纵向偏移                                         |
| close           | `Boolean`   | `false`  | 是否可手动关闭                                      |
| duration        | `Number`    | `4500`   | 延时关闭与开启                                      |
| customClass     | `String`    | `-`      | 自定义主题样式类                                     |
| key             | `Number`    | `-`      | `message` 的 `key`，用于 `loading` 和文本更新         |
| onClose         | `Function`  | `-`      | 关闭回调                                         |
| iconPreRender   | `VNode`     | `-`      | 前置元素自定义，请直接传 `JSX/TSX`                       |
| closeRender     | `VNode`     | `-`      | 前置元素自定义，请直接传 `JSX/TSX`                       |
| loading         | `Boolean`   | `false`  | 显示 `loading`                                 |




