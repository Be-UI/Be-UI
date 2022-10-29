---
title: loading
lang: en-US
---

# be-loading 载入

## 介绍

这是基于 `SVG` 的图标。

## 演示

### 基本使用
:::warning

注意：以组件的形式使用 `loading` 请将 `be-loading` 放在你需要 `loading` 下作为该元素的子元素,并确保该元素具有宽高,且不是默认定位。

:::
:::demo 以组件的形式使用 `loading`

loading/basic

:::

### 自定义颜色
:::demo 以组件的形式使用 `color` 可以定义 `loading` 小球颜色

loading/color

:::

### 自定义文本
:::demo `text` 可以设置文本

loading/text

:::

### 自定义文本颜色
:::demo `colorText` 可以设置文本颜色

loading/textColor

:::

### 设置 loading 的圆角
:::demo 你可以通过 `round` 让它变得圆起来。

loading/round

:::

### 内置了三种大小
:::demo 可以通过 `size` 设置, `'small' | 'default' | 'large'`

loading/size

:::

### 关闭 loading 的小方块背景
:::demo `isBackground` 关闭 `loading` 的小方块背景

loading/background

:::

### 设置遮照颜色
:::demo `mdColor` 设置 `loading` 的遮罩背景颜色

loading/mdColor

:::

### 自定义样式
:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

loading/class

:::

### 全屏显示
:::demo `isFullScreen` 直接开启全屏 `loading`

loading/full

:::

### 自定义渲染内容
:::demo `customRender` 来自定义渲染 `loading`

loading/custom

:::

### 通过函数方法直接调用
:::warning

注意：通过函数方法直接调用，你可以传入与组件使用时相同的 `props`，但是它只支持全屏的 `loading`

:::
:::demo `be-loading` 可以通过函数的方式直接调用

loading/funcCall

:::

## Props

### loading-props

| 名称           | 类别                          | 默认值                    | 说明                                   |
|--------------|-----------------------------|------------------------|--------------------------------------|
| delay        | `Number`                    | `0`                    | 延时 `loading`                           |
| color        | `String`                    | `#4f60a7ff`            | `loading` 动画球颜色                        |
| colorText    | `String`                    | `#000000`              | `loading` 动画球颜色                        |
| text         | `String`                    | `-`                    | `loading` 文字说明                         |
| round        | `Number or String`          | `5`                    | `round`                              |
| size         | `String`                    | `default`              | `loading` 尺寸 `small / default / large` |
| isBackground | `Boolean`                   | `true`                 | 是否开启小圆角背景                            |
| mdColor      | `String`                    | `rgba(255,255,255,.5)` | 遮罩颜色                                 |
| customClass  | `String`                    | `-`                    | 自定义样式类                               |
| customRender | `Function:JSX / TSX / null` | `-`                    | 自定义渲染内容方法                            |
