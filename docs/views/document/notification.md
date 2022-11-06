---
title: be-notification
lang: en-US
---

# notification 消息提示

## 介绍

消息提示，就是一个通知。


## 演示

### 基本使用

:::demo 内置了一些基础的样式类型。你可以通过 `msgType` 来设置, `success` | `info` | `warning` | `error`

notification/basic

:::

### 显示方向

:::demo 内置了四个方向。你可以通过 `placement` 来设置

notification/placement

:::

### 纵向偏移
:::warning

注意：意在同一时刻，每一个的 `notification` 实例应当具有一个相同的偏移量。

:::
:::demo `offsetTop` 或 `offsetBottom` 可以自定义你需要的偏移量。

notification/offset

:::

### 可关闭的 notification

:::demo 你可以通过 `close` 让 `notification` 可以关闭，`onClose` 则可以传入指定的关闭回调

notification/close

:::


### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

notification/class

:::

### notification 内容更新

:::demo 通过传入 `key` 标记 `notification` 来实现文本更新

notification/update

:::

### 自定义前置内容

:::demo 通过 `iconPreRender` 来自定义前置元素内容

notification/preRender

:::

### 自定义关闭元素内容

:::demo 通过 `closeRender` 来自定义关闭元素内容

notification/closeRender

:::

### 自定义渲染内容

:::demo 通过 `bodyRender` 来自定义关闭元素内容

notification/bodyRender

:::

### 带有 loading 的 notification
:::warning

注意：需要配合 `props` 的 `key` 使用

:::
:::demo 通过 `loading` 来让 `notification` 进入 `loading` 显示

notification/loading

:::


## Props

### notification-props

| 名称             | 类别         | 默认值      | 说明                                          |
|----------------|------------|----------|---------------------------------------------|
| titles         | `String`   | `-`      | 标题                                          |
| description    | `String`   | `-`      | 文本内容                                        |
| msgType        | `String`   | `info`   | 尺寸 `'success'/ 'info' / 'warning'/ 'error'` |
| offsetTop      | `Number`   | `-`      | 顶部纵向偏移                                      |
| offsetBottom   | `Number`   | `-`      | 底部纵向偏移                                      |
| close          | `Boolean`  | `false`  | 是否可手动关闭                                     |
| duration       | `Number`   | `4500`   | 延时关闭与开启                                     |
| customClass    | `String`   | `-`      | 自定义主题样式类                                    |
| key            | `Number`   | `-`      | `message` 的 `key`，用于 `loading` 和文本更新        |
| onClose        | `Function` | `-`      | 关闭回调                                        |
| onClick        | `Function` | `-`      | 点击回调                                        |
| iconPreRender  | `VNode`    | `-`      | 前置元素自定义，请直接传 `JSX/TSX`                |
| closeRender    | `VNode`    | `-`      | 前置元素自定义，请直接传 `JSX/TSX`                |
| bodyRender     | `Function` | `-`      | 自定义内容，请直接传返回`JSX/TSX`的函数            |
| loading        | `Boolean`  | `false`  | 显示 `loading`                                |
