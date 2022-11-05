---
title: be-input-number
lang: en-US
---

# be-input-number 数字输入

## 介绍

通过鼠标或键盘，输入范围内的数值。


## 演示

### 基本使用

:::demo 内置了三种尺寸，通过 `size` 设置 `mini` | `medium` | `large`

input-number/basic

:::

### 禁用

:::demo `disabled` 可以禁用你的 `input-number`

input-number/disabled

:::

### 键盘控制

:::demo `keyboard` 可以开启键盘行为

input-number/keyboard

:::

### 控制步长

:::demo `step` 可以定义步长

input-number/step

:::

### 显示格式化与自定义解析
:::warning

注意：`parser` 会在 `change` 和 `input` 事件中调用，而且你必须针对 `formatter` 在 `parser` 中将其还原为纯数字字符，否则 `parser` 将无效。

:::
:::demo `formatter` 是输入框显示格式，而 `parser` 是输入框实际绑定的格式，二者需要配合使用

input-number/step

:::


## Props

### input-number-props

| 名称          | 类别                            | 默认值       | 说明                                                                                     |
|-------------|-------------------------------|-----------|-------------------------------------------------------------------------------------------------|
| size        | `String`                      | `medium`  | 尺寸 `'small' / 'medium'/ 'large'`                                                                |
| type        | `String`                      | `default` | 尺寸 `'default' / 'primary'/ 'success'/ 'info' / 'warning'/ 'error'`                              |
| disabled    | `Boolean`                     | `false`   | 禁用                                                                                              |
| round       | `Number`                      | `0`       | 载入                                                                                              |
| isClose     | `Boolean`                     | `false`   |自定义主题样式类                                                                                    |
| customClass | `String`                      | `-`       | 指定开启时的值                                                                                     |
| option      | `Object`                      | `-`       | 配置，背景色，边框色，文字色 `{ borderRadius: String,backgroundColor: String,border: String,color: String,}`  |


## Emits

### input-number-emit

| 名称             | 参数              | 说明               |
|----------------|-----------------|------------------|
| close          | 事件对象 `event`    | 关闭时的回调方法 |


## Slots

### input-number-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |




