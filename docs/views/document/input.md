---
title: be-input
lang: en-US
---

# be-input 输入框

## 介绍

一个简单的输入框


## 演示

### 基本使用

:::demo 内置了三种尺寸，通过 `size` 设置 `mini` | `medium` | `large`

input/basic

:::

### 禁用

:::demo `disabled` 可以禁用你的 `input`

input/disabled

:::

### 输入清除

:::demo `clearable` 使得输入框可以清除

input/clear

:::


### 密码输入

:::demo `showPassword` 让输入框 内置密码显示控制

input/password

:::

### 自定义图标

:::demo `prevIcon` 前置 `icon` 类型 与 `nextIcon` 后置 `icon` 图标类型

input/iconInput

:::

### 直接修改样式

:::demo `inputStyle` 直接修改样式

input/style

:::

### 自定义样式类

:::demo 通过 `customClass` 来传入样式类，覆盖原有样式

input/class

:::

### 多行文本

:::demo `type` 设置为` textarea` 来变成多行文本输入

input/textarea

:::

### 控制多行文本行数

:::demo `rows` 控制多行文本行数

input/rows

:::

### 多行文本最大或最小行数

:::demo `autosize` 控制多行文本最大或最小行数

input/autosize

:::


## Props

### input-props

| 名称           | 类别                                                                        | 默认值       | 说明                                 |
|--------------|---------------------------------------------------------------------------|-----------|------------------------------------|
| id           | `String`                                                                  | `-`       | `id` 直接作用到 `input` 元素上             |
| maxlength    | `String`                                                                  | `-`       | 最大长度限制                             |
| placeholder  | `Boolean`                                                                 | `-`       | 输入框占位文本                            |
| modelValue   | `String / Number`                                                         | `-`       | 绑定值                                |
| size         | `String`                                                                  | `default` | `'mini' / 'medium' / 'large'`      |
| customClass  | `String`                                                                  | `-`       | 自定义主题样式类                           |
| disabled     | `Boolean`                                                                 | `false`   | 禁用                                 |
| clearable    | `Boolean`                                                                 | `false`   | 是否可以清除                             |
| type         | `String`                                                                  | `text`    | 输入框类型 `'text' / 'textarea'`        |
| showPassword | `Boolean`                                                                 | `false`   | 禁用                                 |
| prevIcon     | `String`                                                                  | `-`       | 前置 `icon` 图标类型（必须是 `be-icon` 的名称）  |
| nextIcon     | `String`                                                                  | `-`       | 后置 `icon` 图标类型（必须是 `be-icon` 的名称）  |
| label        | `String / Number`                                                         | `-`       | 输入框关联的 `label` 文字                  |
| tabindex     | `Boolean`                                                                 | `false`   | `input` 元素或 `textarea` 元素的 `style` |
| inputStyle   | `CSSStyle`                                                                | `-`       | 禁用                                 |
| rows         | `Number`                                                                  | `3`       | 输入框行数，只对 `type="textarea"` 有效      |
| autosize     | `[Boolean, Object] as AutosizeProp:{ minRows?: number,maxRows?: number}`  | `-`       | 文本域自动调整,可以限制最大、最小行数                |                                |


## Emits

### input-emit

| 名称             | 参数                                      | 说明        |
|----------------|-----------------------------------------|-----------|
| change         | 当前值 modelValue: `String / Number`    | 绑定值变化时的事件 |
| blur           | 当前值 modelValue: `String / Number`    | 失焦事件      |
| focus          | 当前值 modelValue: `String / Number`    | 聚焦事件      |
| mouseenter     | `-`                                   | 鼠标移入      |
| mouseleave     | `-`                                   | 鼠标移出      |
| prevIconClick  | `-`                                   | 前置图标点击    |
| nextIconClick  | `-`                                   | 后置图标点击    |
| clear          | 事件对象 `event`                        | 清除方法      |
| keydown        | 事件对象 `event`                        | 键盘按下方法    |
| input          | 当前值 modelValue: `String / Number`   | 输入方法      |


## Slots

### input-slot

| 名称              | 说明            |  
|-----------------|---------------|
| prev            | `input` 的前置图标插槽 |
| next            | `input` 的后置图标插槽 |


## Public Function

### input-public-function

| 名称           | 参数         | 说明                                |
|--------------|------------|-----------------------------------|
| focus        | `-` | 通过 `refs` 可以手动聚焦，不会触发 `emit('focus')` |
| blur         | `-` | 通过 `refs` 可以手动聚焦，不会触发 `emit('blur') ` |
| select       | `-` | 通过 `refs` 可以手动聚焦，不会触发 `emit('select')` |
| handleClear  | `-` | 通过 `refs` 可以手动聚焦，⚠️会触发 `emit('clear')`  |

