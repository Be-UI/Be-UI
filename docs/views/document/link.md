---
title: be-link
lang: en-US
---

# be-link 链接

## 介绍

link on ！ ！


## 演示

### 基本使用

:::demo 内置了一些基础的样式类型。你可以通过 `type` 来设置, `default` | `primary` | `success` | `warning` | `error` | `info`

link/basic

:::

### 禁用

:::demo `disabled` 可以直接禁用

link/disabled

:::

### 无下划线

:::demo `underline` 可以控制显示下划线

link/underline

:::

### 前置与后置图标

:::demo `prevIcon` 与 `nextIcon` 显示前置与后置图标

link/icon

:::


## Props

### link-props

| 名称          | 类别                            | 默认值        | 说明                                                                     |
|-------------|-------------------------------|------------|------------------------------------------------------------------------|
| modelValue  | `Boolean / String / Number`   | `default`  | 颜色类型 `'default' / 'primary' / 'success' / 'warning' / 'error' / 'info'` |
| content     | `String`                      | `-`        | 文本内容                                                                   |
| disabled    | `Boolean`                     | `false`    | 禁用                                                                     |
| underline   | `Boolean`                     | `false`    | 显示下划线                                                                  |
| href        | `String`                      | `-`        | 跳转链接                                                                   |
| prevIcon    | `String`                      | `-`        | 前置 `icon` 图标类型（必须是 `be-icon` 的名称）                                      |
| nextIcon    | `String`                      | `-`        | 后置 `icon` 图标类型（必须是 `be-icon` 的名称）                                      |


## Slots

### link-slot

| 名称        | 说明     |  
|-----------|--------|
| nextIcon  | 前置图标插槽 |
| prevIcon  | 后置图标插槽 |



