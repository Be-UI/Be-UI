---
title: be-ellipsis
lang: en-US
---

# be-ellipsis 文本缩略

## 介绍

它能够在一定程度上缩略的你文字。


## 演示

### 基本使用

:::demo `content` 是你需要提示的内容，`text`则是你需要缩略的文本

ellipsis/basic

:::

### 定义缩略的字数

:::demo 这里通过 `elpNum` 可以指定你需要缩略的字数

ellipsis/elpnum

:::

### 你需要縮略的位置

:::demo `placement` 可以指定你需要縮略的位置 '`left' | 'center' | 'right'`

ellipsis/placement

:::

### 多行省略

:::demo `lineClamp` 可以指定你需要多行省略(换行时显示几行)，`expandTrigger` 则可以实现展开

ellipsis/lineClamp

:::

## Props

### ellipsis-props

| 名称            | 类别              | 默认值    | 说明                           |
| -------------- |-----------------|--------|-----------------------------------|
| content        | `String`        | `-`    | 提示显示内容                        |
| text       | `String`        | `-`    | 显示内容                              |
| expandTrigger         | `Boolean`       | false  | 点击展开                    |
| lineClamp        | `Number / null` | `null` | 多行省略                         |
| elpNum     | `Number`        | `5`    | 缩略字符数                             |
| placement  | `String`        | `left` | 缩略位置 `'left' / 'center'/ 'right'` |



