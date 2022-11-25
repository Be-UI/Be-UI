---
title: be-back-top
lang: en-US
---

# be-back-top 返回顶部

## 介绍

想回到过去， 试着让故事继续

## 演示

### 基本使用

:::demo 没啥好说的请直接看 demo

backtop/basic

:::

### 自定义插槽与返回时间

:::demo` back-top` 支持插槽自定义渲染，同时通过 `duration` 设置返回到顶部的时间

backtop/duration

:::



## Props

### back-top-props

| 名称          | 类别       | 默认值        | 说明           |
|-------------|----------|------------|--------------|
| right       | `Number` | `40`       | 距离屏幕右侧距离     |
| bottom      | `Number` | `40`       | 距离屏幕底部距离     |
| showHeight  | `Number` | `200`      | 到达此高度显示      |
| target      | `String` | `-`        | 滚动的目标元素 `id` |
| easing      | `String` | `quartOut` | 动画           |
| duration    | `Number` | `500`      | 回到顶部所用时间     |


## Emits

### back-top-emit

| 名称             | 参数              | 说明    |
|----------------|-----------------|-------|
| click          | 事件对象 `event`    | 点击时方法 |


## Slots

### back-top-slot

| 名称              | 说明        |  
|-----------------|-----------|
| slot            | 就是普通插槽    |




