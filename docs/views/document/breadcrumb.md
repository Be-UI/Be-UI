---
title: be-breadcrumb
lang: en-US
---

# be-ellipsis 文本缩略

## 介绍

它由 `Be-Breadcrumb` 与 `Be-Breadcrumb-Item` 组成，以下都是 `Be-Breadcrumb-Item` 的功能特性


## 演示

### 基本使用

:::demo 你可以通过 `to` 指定跳转路由，不传？那就是个文字

breadcrumb/basic

:::

### `separator` 分隔符

:::demo 分隔符,你可以 `props` 传，也可以用插槽来自定义

breadcrumb/separator

:::

### 禁用

:::demo `disabled` 来实现禁用某个 `be-breadcrumb-item`

breadcrumb/disabled

:::

### 自定义点击
:::warning

注意：传入 `click` 后，默认的跳转方法会失效，你需要在 `click` 事件中手动跳转,而且最后一个 `be-breadcrumb-item` 不会响应事件

:::

:::demo 通过 `props` 传入一个 `click` 事件

breadcrumb/click

:::

### 面包屑下拉

:::demo 通过 `clickOption` 与 `option` 能够实现面包屑下拉

breadcrumb/option

:::


## Props

### be-breadcrumb-item-props

| 名称            | 类别              | 默认值     | 说明                                              |
| -------------- |-----------------|---------|-----------------------------------------------------|
| separator        | `String`        | `/`     | 自定义分隔符，优先级小于分隔符插槽 `separator`          |
| to       | `String`        | `-`     | 跳转的目标地址路由                                           |
| disabled         | `Boolean`       | `false` | 禁用                                              |
| click        | `Function` | `-`     | 点击方法                                                    |
| clickOption     | `Function`        | `-`     | 点击下拉可不方法                                   |
| option  | `Array<IList>`        | `[]`    | 下拉列表 `interface IList { label:string id:string }` |

## Slots

### be-breadcrumb-slot
| 名称            | 说明                                         |
| -------------- |--------------------------------------------|
| slot        | 就是普通插槽,但是你必须传入组件 `be-breadcrumb-item`|
### be-breadcrumb-item-slot
| 名称          | 说明                                          |
| ------------ |---------------------------------------------|
| slot        | 就是普通插槽,但是你必须传入组件 `be-breadcrumb-item` |
| separator   | 自定义分隔符插槽，优先级高于 `props separator`      |


