---
title: be-container
lang: en-US
---

# be-container 容器布局

## 介绍

这是个布局使用的组件，包含 footer、header、aside、container、main.


## 演示

### 基本使用

:::demo 这里列举了一些常用的布局，如果产品经理那厮不识好歹，搞得布局难跌一批，那就自己写。

container/basic

:::

:::demo 

container/header-main-footer

:::

:::demo 

container/left-main

:::

:::demo 

container/header-left-main

:::

:::demo 

container/header-left-main-footer

:::

:::demo 

container/left-header-main

:::

:::demo 

container/left-header-main-footer

:::



## Props

### footer-props

| 名称              | 类别                            | 默认值       | 说明                  |
|-----------------|-------------------------------|-----------|---------------------|
| height          | `String`                      | `-` | `footer` 的高度 |
### header-props

| 名称             | 类别                            | 默认值 | 说明         |
|----------------|-------------------------------|-----|------------|
| height         | `String`                      | `-` | `header` 的高度 |
### aside-props

| 名称             | 类别                            | 默认值 | 说明        |
|----------------|-------------------------------|-----|-----------|
| width          | `String`                      | `-` | `aside` 的宽度 |
### container-props

| 名称                 | 类别                            | 默认值 | 说明                                       |
|--------------------|-------------------------------|-----|------------------------------------------|
| direction          | `String`                      | `-` | `container` 的方向，取值 `horizontal`、`vertical` |
### main-props

| 名称  | 类别                         | 默认值 | 说明  |
|-----|----------------------------|-----|-----|
| -   | `-`                        | `-` | `-` |



## Slots

### footer-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |

### header-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |

### aside-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |

### container-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽，但是你只能传入`be-header`和`be-footer` |

### main-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |




