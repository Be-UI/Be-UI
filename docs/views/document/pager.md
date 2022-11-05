---
title: be-pagination
lang: en-US
---

# be-pagination 分页

## 介绍

分页有三种模式，动态分页、前端分页和常规分页


## 演示

### 基本使用

:::demo 常规分页基本使用

pager/basic

:::


### 禁用

:::demo `disabled` 可以禁用你的 `pagination`

pager/disabled

:::


### 禁用跳转

:::demo `disabledJump` 来实现禁用输入跳转

pager/disabledJump

:::


### 控制显示页数

:::warning

注意：参数有效必须大于 `2` ,当传入 `isDynamic` 动态分页时，此值则是动态分页最大显示数量

::: 

:::demo `pagerShowCount` 页数过多时，显示的页数

pager/pagerShowCount

:::


### 设置分页下拉

:::demo `pageNum` 设置每页显示数量

pager/pageNum

:::


### 设置分页布局

:::demo `layout` 设置分页控件的显示与顺序

pager/layout 

:::

### 自定义插槽渲染
:::warning

注意：它受到布局配置 `layout` 影响

:::
:::demo 你也可以通过插槽 `next` 与 插槽 `prev` 自己来渲染分页前后内容

pager/render 

:::

### 动态分页

:::tip

开启动态分页，适用于分页总页数未知或动态变化场景

::: 

:::warning

注意：开启动态分页后，由于不确定数据总数，所以 `layout` 中数据总数 `pNum` 和 分页信息 `info` 将不再适用

::: 

:::demo `isDynamic` 开启动态分页

pager/dynamic 

:::

### 开启前端分页

:::demo `isFront` 配合 `pageData` 开启前端分页

pager/front 

:::


## Props

### pagination-props

| 名称          | 类别                            | 默认值       | 说明                                                                                              |
|-------------|-------------------------------|----------------|-------------------------------------------------------------------------------------------------|
| pageSize       | `Number`                 | `5`                                                        | 每页条数                                                                                                      |
| currentPage    | `Number`                 | `1`                                                        | 当前页                                                                                                       |
| pageCount      | `Number`                 | `false`                                                    | 数据总条数，仅在 常规分页 `isOrdianry` 为 `true` 时有效                                                           |
| disabled       | `Boolean`                | `false`                                                    | 是否禁用                                                                                                     |
| disabledJump   | `Boolean`                | `false`                                                    |是否禁用输入跳转                                                                                               |
| pagerShowCount | `Number`                 | `-`                                                        | 页数过多时，显示的页数 当传入 `isDynamic` 动态分页时，此值则是动态分页最大显示数量                                       |
| pageNum        | `Array<{label:number}>`  | `[{label: 100}, {label: 200}, {label: 300}, {label: 400}]` | 每页显示数量设置                                                                                             |
| layout         | `Array<string>`          | `['prev', 'page', 'jump', 'info', 'next', 'pNum']`         | 自定义布局 `'prev' = 前置插槽` ；`'jump' = '输入跳转'`；`'info' = 页码信息` ；`'next' = 后置插槽` ；`'pNum' = 每页显示数量设置` |
| isOrdianry     | `Boolean`                | `true`                                                     | 常规分页                                                                                                   |
| isDynamic      | `Boolean`                | `false`                                                    | 是否开启动态分页                                                                                            |
| isFront        | `Boolean`                | `false`                                                    | 是否开启前端分页                                                                                            |
| pageData       | `Array`                  | `[]`                                                       | 前端分页数据                                                                                               |


## Emits

### pagination-emit

| 名称             | 参数              | 说明               |
|------------------|---------------------|------------------|
| updateNum          | 事件对象 `event`                   | 设置每页显示数时方法 |
| updatePage         | `Array<any>` 当且分页的切片数据   | 前端分页中，更新分页数据方法 |
| changePage         | `data:IPageData` 最新的分页参数   | 分页触发方法 |


## Slots

### pagination-slot

| 名称              | 说明        |  
|-----------------|-----------|
| next            | 前置内容插槽    |
| prev            | 后置内容插槽    | 


