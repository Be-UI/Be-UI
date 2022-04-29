<p align="center">
  <a href="http://be-ui3.cn/">
    <img width="200" src="/public/logo.png">
  </a>
</p>

# Be-UI3

基于 vue3.0 的简单 ui 组件库

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

打包：types
monorepo 
文档



1.样式重构
be-select 支持绑定对象;禁用背景色

be-loading 样式修改 修改层级：loading 2010 》 notification = message-box = message = popover = 2000 》 dialog 1998
be-notification 单元测试  
样式重构

## 长期排期

1.服务式访问的全局绑定  
2.组件引用编写

## 内容

| 序号 | 名称         | 组件            | 完成状态                            | 单元测试                            |
| ---- | ------------ | --------------- | ----------------------------------- | ----------------------------------- |
| 1    | 布局容器     | be-container    | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 2    | refactor style 右键菜单     | be-contextmenu  | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 3    | 对话框       | be-dialog       | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 4    | refactor style 输入框       | be-input        | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 5    | refactor style 载入         | be-loading      | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 6    | 消息对话     | be-message-box  | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 7    | 分页         | be-pager        | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 8    | 图标         | be-icon         | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 9    | 消息通知     | be-notification | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 10   | 文本省略     | be-ellipsis     | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 11   | 弹出显示     | be-popover      | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 12   | 文本弹出显示 | be-toolTip      | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 13   | refactor style 按钮         | be-button       | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 14   | 自动补全输入 | be-autocomplete | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 15   | 标签         | be-tag          | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 16   | refactor style 选择框       | be-select       | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 17   | 消息提示     | be-message      | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 18   | refactor style 数字输入     | be-input-number | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 19   | 开关         | be-switch       | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 20   | 面包屑       | be-breadcrumb   | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 21   | 进度条       | be-progress     | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |

### 配置 hasky 与 commitlint

- npm install -save-dev @commitlint/cli @commitlint/config-conventional
- 新建文件 commitlint.config.js，内容：module.exports = {extends: ['@commitlint/config-conventional']}
- npm install husky --save-dev
- npm set-script prepare "husky install"
- npm run prepare
- npx husky add .husky/pre-commit "npm run commit"
- git add .husky/pre-commit
- npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
- 在 package.json 的 script 里面配置"commit": "这里面添加 eslint、单测、stylelint 等"
- 提交时执行命令例如 git commit -am "optimize: 项目添加 commitlint 本地校验配置" 或 git commit -m "optimize: 项目添加 commitlint 本地校验配置"

### m
pnpm install @be-ui/docs -w