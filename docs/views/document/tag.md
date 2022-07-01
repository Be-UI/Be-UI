---
title: be-tag
lang: en-US
---

# be-tag 开关

## 介绍

别乱给我的项目打标签！！


## 演示

### 基本使用

:::demo 内置了三种尺寸，通过 `size` 设置 `mini` | `medium` | `large`

tag/basic

:::

### 不同情感类型

:::demo 内置了六种类型，通过 `type` 设置 `default` | `primary` | `success` | `info` | `warning` | `error`

tag/type

:::

### 禁用

:::demo `disabled` 可以禁用你的 `tag`

tag/disabled

:::

### 开启圆角

:::demo 你可以通过 `round` 让它变得圆起来。

tag/round

:::

### 可关闭的 `tag`
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

### tag-props

| 名称          | 类别                            | 默认值       | 说明                                                                                              |
|-------------|-------------------------------|-----------|-------------------------------------------------------------------------------------------------|
| size        | `String`                      | `medium`  | 尺寸 `'small' / 'medium'/ 'large'`                                                                |
| type        | `String`                      | `default` | 尺寸 `'default' / 'primary'/ 'success'/ 'info' / 'warning'/ 'error'`                              |
| disabled    | `Boolean`                     | `false`   | 禁用                                                                                              |
| round       | `Number`                      | `0`       | 载入                                                                                              |
| isClose     | `Boolean`                     | `false`   |自定义主题样式类                                                                                        |
| customClass | `String`                      | `-`       | 指定开启时的值                                                                                         |
| option      | `Object`                      | `-`       | 配置，背景色，边框色，文字色 `{ borderRadius: String,backgroundColor: String,border: String,color: String,}`  |


## Emits

### tag-emit

| 名称             | 参数              | 说明               |
|----------------|-----------------|------------------|
| close          | 事件对象 `event`    | 关闭时的回调方法 |


## Slots

### tag-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |




