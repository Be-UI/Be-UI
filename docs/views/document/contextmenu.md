---
title: be-contextmenu
lang: en-US
---

# be-contextmenu 右键菜单

## 介绍

`Contextmenu` 右键菜单组件 由 `be-contextmenu`、`be-contextmenu-item`、`be-contextmenu-sub-menu` 组成


## 演示

### 基本使用
:::warning

注意：你需要使用 be-contextmenu、be-contextmenu-item 两个组件，并把它们放到你想要触发的元素标签下，并配合指令 v-contextmenu 使用。

:::
:::tip

在 be-contextmenu 组件标签上,你需要给上 ref 如 <be-contextmenu ref="contextmenu"/> ,并将它传给指令 v-contextmenu:contextmenu

:::

:::demo

contextmenu/basic

:::

### 不同情感类型

:::demo 内置了六种类型，通过 `type` 设置 `default` | `primary` | `success` | `info` | `warning` | `error`

tag/type

:::

### 禁用

:::demo `disabled` 可以禁用你的 `contextmenu`

tag/disabled

:::

### 开启圆角

:::demo 你可以通过 `round` 让它变得圆起来。

tag/round

:::

### 可关闭的 `contextmenu`
:::warning
这里只实现了事件触发，真正的删除你还是通过数据维护
:::

:::demo `isClose` 可以开启关闭图标，并通过传入 `close` 事件来完成回调

tag/close

:::

### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

tag/class

:::

### 开启样式配置

:::demo 通过 `option` 来传入可以直接修改边框、背景、圆角、字体

tag/style

:::


## Props

### contextmenu-props

| 名称            | 类别                        | 默认值         | 说明                              |
|---------------|---------------------------|-----------------|---------------------------------|
| eventType     | `String`                  | `contextmenu`   | 触发显示事件类型                        |
| theme         | `String`                  | `default`         | 内置主题色 `dark / bright / default` |
| disabled      | `String`                  | `false`       | 禁用                              |

### contextmenu-item-props

| 名称            | 类别                  | 默认值      | 说明       |
|---------------|---------------------|----------|----------|
| divider       | `Boolean`           | `false`  | 是否显示为分割线 |
| autoHide      | `Boolean`           | `true`   | 是否禁用     |
| disabled      | `Boolean`           | `false`  | 点击后是否隐藏  |


### contextmenu-sub-menu-props

| 名称          | 类别                             | 默认值   | 说明    |
|-------------|--------------------------------|-------|-------|
| title        | `String`                      | `-`   | 子菜单文字 |




## Emits

### contextmenu-emit

| 名称             | 参数                             | 说明               |
|----------------|--------------------------------|------------------|
| show          | `getCurrentInstance()` 获得的组件实例 | 菜单显示时触发的回调 |
| hide          | `getCurrentInstance()` 获得的组件实例 | 菜单隐藏时触发的回调 |
| contextmenu   | 组件实例的 `VNode` 或 `null`         | 自定义的右键触发回调 |

### contextmenu-item-emit

| 名称              | 参数                                       | 说明               |
|-----------------|------------------------------------------|------------------|
| click           | `getCurrentInstance()` 获得的组件实例，`event` 事件对象  | 点击事件 |
| mouseleave      | `getCurrentInstance()` 获得的组件实例，`event` 事件对象  | 移出事件 |
| mouseenter      | `getCurrentInstance()` 获得的组件实例，`event` 事件对象  | 移入事件 |

### contextmenu-sub-menu-emit

| 名称           | 参数                                        | 说明               |
|--------------|-------------------------------------------|------------------|
| mouseleave   | `getCurrentInstance()` 获得的组件实例，`event` 事件对象   | 移出事件 |
| mouseenter   | `getCurrentInstance()` 获得的组件实例，`event` 事件对象   | 移入事件 |

## Slots

### contextmenu-slot

| 名称              | 说明                                                                 |  
|-----------------|--------------------------------------------------------------------|
| slot            | 普通插槽,请传入 `be-contextmenu-item` 组件 或 `be-contextmenu-sub-menu`组件 |

### contextmenu-item-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 普通插槽,菜单显示内容    |

### contextmenu-sub-menu-slot

| 名称              | 说明                              |  
|-----------------|---------------------------------|
| slot            | 普通插槽,请传入 `be-contextmenu-item`  |




