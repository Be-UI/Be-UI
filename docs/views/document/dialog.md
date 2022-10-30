---
title: dialog
lang: en-US
---

# dialog 弹唱

## 介绍

这是基于 `SVG` 的图标。

## 演示

### 基本使用

:::demo 点击按钮看看 `dialog`

dialog/basic

:::

### 自定义弹窗内容
:::warning

注意：如果你使用了底部插槽（`#footer`）和 关闭按钮插槽(`#headerIcon`),请绑定相应事件。

:::
:::demo 通过插槽，你可以自定义弹窗内容、弹窗底部（`#footer`），关闭按钮(`#headerIcon`)

dialog/custom

:::

### 关闭背景蒙层

:::demo `isOpenModal` 关闭背景蒙层

dialog/modal

:::

### 拖拽弹窗
:::warning

注意：`isDrag` 范围是根据 `body` 来定位的，你需要给 `body` 设置宽高。

:::
:::demo 你可以通过设置 `isDrag` 来让它可以拖拽

dialog/drag

:::

### 底部对齐布局

:::demo `layout` 设置底部 底部对齐类型

dialog/layout

:::

### 键盘控制弹窗关闭

:::demo `escExit` 开启键盘 `ESC` 关闭

dialog/esc

:::

### 自定义样式
:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

dialog/class

:::

## Props

### dialog-props

| 名称            | 类别         | 默认值      | 说明                             |
|---------------|------------|----------|--------------------------------|
| titles        | `String`   | `-`      | 标题                             |
| customClass   | `String`   | `-`      | 自定义样式类                         |
| isDrag        | `Boolean`  | `false`  | 是否拖拽                           |
| isShow        | `Boolean`  | `false`  | 是否显示                           |
| isOpenModal   | `Boolean`  | `false`  | 是否开启遮罩蒙层                       |
| escExit       | `Boolean`  | `false`  | 是否开启 esc 退出                    |
| layout        | `String`   | `center` | 底部对齐类型 `right / center / left` |


## Emits

### dialog-emit

| 名称         | 参数    | 说明                            |
|------------|-------|-------------------------------|
| close      | `-` | 关闭时方法（仅在未使用插槽 `headerIcon` 时有效） |
| confirm    | `-` | 确认时方法（仅在未使用插槽 `footer` 时有效）     |
| escEvt     | `-` | `esc` 键关闭弹窗前方法                  |


## Slots

### dialog-slot

| 名称             | 说明                                             |  
|----------------|------------------------------------------------|
| slot           | 就是普通插槽                                         |
| headerIcon     | 弹窗关闭按钮渲染，使用后弹窗将不再触发 `emit` 的 `close`，你需要自己定义   |
| footer         | 弹窗底部内容渲染，使用后弹窗将不再触发 `emit` 的 `confirm`，你需要自己定义 |

