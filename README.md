<p align="center">
  <a href="https://www.antdv.com/">
    <img width="200" src="/public/logo.png">
  </a>
</p>

# Be-UI3

基于vue3.0的简单ui组件库

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 已知问题

internalInstance.ctx 禁止使用 proxy.$el.

## 排期

be-autocomplete 远程加载防抖

be-loading 样式修改 修改层级：loading 》 notification = message-box = message = popover 》 dialog  
be-notification 单元测试  
样式重构

## 长期排期

1.服务式访问的全局绑定  
2.组件引用编写

## 内容

|  序号   |  名称   | 组件  | 完成状态  | 单元测试  |
|  ---- |  ----  | ----  | ----  | ----  |
|1| 布局容器  | be-container |<font color=#07c160 size=5>√</font>|<font color=#07c160 size=5>√</font>|
|2| 右键菜单  | be-contextmenu |<font color=#07c160 size=5>√</font>|<font color=#07c160 size=5>√</font>|
|3| 对话框  | be-dialog | <font color=#07c160 size=5>√</font>|<font color=#07c160 size=5>√</font> |
|4| 输入框  | be-input | <font color=#07c160 size=5>√</font>|<font color=red size=5>×</font> |
|5| 载入  | be-loading | <font color=#07c160 size=5>√</font>|<font color=#07c160 size=5>√</font>|
|6| 消息对话  | be-message-box | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font>|
|7| 分页  | be-pager | <font color=#07c160 size=5>√</font>  | <font color=red size=5>×</font> |
|8| 图标  | be-icon | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|9| 消息通知  | be-notification | <font color=#07c160 size=5>√</font>  | <font color=red size=5>×</font> |
|10| 文本省略  | be-ellipsis | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|11| 弹出显示  | be-popover | <font color=#07c160 size=5>√</font>  | <font color=red size=5>×</font> |
|12| 文本弹出显示  | be-toolTip | <font color=#07c160 size=5>√</font>  | <font color=red size=5>×</font> |
|13| 按钮  | be-button | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|14| 自动补全输入 | be-autocomplete  | <font color=#07c160 size=5>√</font>  | <font color=red size=5>×</font> |
|15| 标签  | be-tag | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|16| 选择框  | be-select | <font color=#07c160 size=5>√</font>  | <font color=red size=5>×</font> |
|17| 消息提示  | be-message | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|18| 数字输入  | be-input-number | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|19| 开关  | be-switch | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |
|20| 面包屑  | be-breadcrumb | <font color=#07c160 size=5>√</font>  | <font color=#07c160 size=5>√</font> |











