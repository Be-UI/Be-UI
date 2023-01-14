---
title: be-badge
lang: en-US
---

# be-badge 徽章

## 介绍

给一个元素打上一个标记徽章

## 演示

### 基本使用

:::demo 可以在元素右上角显示一个徽章，可以是 `string` 或 `number`

badge/basic

:::

### 最大值

:::demo 当输入类型为 `number`，且超多最大值 `max`，则会显示 `max+`

badge/max

:::

### 圆点模式

:::demo 不显示数值，值显示一个提示圆点

badge/dot

:::

### 情绪类型

:::demo 内置了几种类型

badge/type

:::





## Props

### badge-props

| 名称       | 类别                                             | 默认值         | 说明    |
|----------|------------------------------------------------|-------------|-------|
| value    | `Number / String`                              | ``          | 显示值   |
| max      | `Number`                                       | `100`       | 显示最大值 |
| isDot    | `Boolean`                                      | `false`     | 是否为圆点 |
| show     | `Boolean`                                      | `true`      | 是否显示  |
| type     | `'primary'/'success'/'info'/'warning'/'error'` | `error`      | 显示类型  |


## Slots

### back-top-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |




