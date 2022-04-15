# 指南

## 介绍

Be-UI3 是在业务累积后，通过整理与重构而来的前端桌面 UI 组件库。如果您在使用时有任何问题，请发邮件至 chenzhi740@foxmail.com

## 安装

方式一：请将 npm 仓库源修改至内网，并通过一下命令安装使用

```shell
npm i -D be-ui3
```

方式二：您也可以直接到内网 GitLab 相关项目页面直接下载打包好的文件

## 使用

在入口文件 main.js 中可以全局使用。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import BeUI from '../public/be-ui/be-ui.es.js'
import '../public/be-ui/style.css'
const app = createApp(App)
app.use(BeUI)
app.mount('#app')
```

## 其他

更新日志
