---
title: be-autocomplete
lang: en-US
---

# be-autocomplete 输入框

## 介绍

一个简单的自动补全


## 演示

### 基本使用

:::demo

autocomplete/basic

:::

### 更改触发

:::demo `focusTrigger` 为 `false` ，设置为输入触发

autocomplete/trigger

:::

### 远程加载

:::demo 通过 `fetchSuggestions` 传入加载方法，此时不需要传入 `suggestionList`

autocomplete/fetch

:::


### 自定义前置图标与后置图标

:::demo `prev` 前置插槽 与 `next` 后置插槽

autocomplete/icon

:::

### 自定义列表渲染

:::demo `prev` 前置插槽 与 `next` 后置插槽

autocomplete/custom

:::


## Props

### autocomplete-props

| 名称                | 类别                | 默认值     | 说明                                   |
|-------------------|-------------------|---------|--------------------------------------|
| modelValue        | `String / Number` | `-`     | 绑定值                                  |
| focusTrigger      | `Boolean`         | `true`  | 是否 `focus` 触发                        |
| suggestionList    | `Array<any>`      | `[]`    | 建议列表                                 |
| labelValue        | `String`          | `label` | `suggestionList` 的显示字段               |
| keyValue          | `String`          | `id`    | `suggestionList` 的键名                 |
| fetchSuggestions  | `Function`        | `-`     | 远程加载下拉列表数据，会传入一个回调方法，你可以把数据传递给它      |
| 其他               | `-`               | `-`     | 支持 `be-input` 的 `text` 模式下其他 `props` |

modelValue	String | Number	''	绑定值
focusTrigger	Boolean	true	是否focus触发
suggestionList	Array<any>	[]	輸入建议列表
labelValue	String	'label'	suggestionList 的显示字段
keyValue	String	'id'	suggestionList 的键名
fetchSuggestions	Function	undefined	远程加载下拉列表数据，会传入一个回调方法，你可以把数据传递给它
其他	-	-	支持 be-input 的 text模式下其他 props

## Emits

### autocomplete-emit

| 名称             | 参数                                 | 说明        |
|----------------|------------------------------------|-----------|
| change         | 当前值 modelValue: `String / Number`  | 绑定值变化时的事件 |
| blur           | 当前值 modelValue: `String / Number`  | 失焦事件      |
| focus          | 当前值 modelValue: `String / Number`  | 聚焦事件      |
| prevIconClick  | `-`                                | 前置图标点击    |
| nextIconClick  | `-`                                | 后置图标点击    |
| clear          | `-`                                | 清除方法      |
| input          | 当前值 modelValue: `String / Number`  | 输入方法      |


## Slots

### autocomplete-slot

| 名称        | 说明                                         |  
|-----------|--------------------------------------------|
| prev      | `autocomplete` 的前置图标插槽                     |
| next      | `autocomplete` 的后置图标插槽                     |
| cus-temp  | `autocomplete` 的自定义类别渲染，他是一个作用域插槽，会把列表传递出来 |


## Public Function

### autocomplete-public-function

| 名称           | 参数         | 说明                                |
|--------------|------------|-----------------------------------|
| handleClear  | `-` | 通过 `refs` 可以手动聚焦，⚠️会触发 `emit('clear')`  |

