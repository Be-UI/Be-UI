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

打包：
types：已完成style、已完成utils（差types文件夹）、已完成打总包，  
打分包(需要修改每个组件，注意保持引用)、类型生成、保证引用路径、删除子包
monorepo √
glup √
文档 迁移 vitepress  
1.样式重构  
be-select 支持绑定对象;  
be-notification 单元测试

## 长期排期

1.服务式访问的全局绑定  
2.组件引用编写

## 内容

| 序号 | 名称                    | 组件            | 完成状态                            | 单元测试                            |
| ---- | ----------------------- | --------------- | ----------------------------------- | ----------------------------------- |
| 1    | 布局容器                | be-container    | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 2    | 右键菜单                | be-contextmenu  | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 3    | 对话框                  | be-dialog       | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 4    | refactor style 输入框   | be-input        | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 5    | 载入                    | be-loading      | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 6    | 消息对话                | be-message-box  | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 7    | 分页                    | be-pager        | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 8    | 图标                    | be-icon         | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 9    | 消息通知                | be-notification | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 10   | 文本省略                | be-ellipsis     | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 11   | 弹出显示                | be-popover      | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 12   | 文本弹出显示            | be-toolTip      | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 13   | 按钮                    | be-button       | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 14   | 自动补全输入            | be-autocomplete | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 15   | 标签                    | be-tag          | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 16   | refactor style 选择框   | be-select       | <font color=#07c160 size=5>√</font> | <font color=red size=5>×</font>     |
| 17   | 消息提示                | be-message      | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 18   | refactor style 数字输入 | be-input-number | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 19   | 开关                    | be-switch       | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 20   | 面包屑                  | be-breadcrumb   | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |
| 21   | 进度条                  | be-progress     | <font color=#07c160 size=5>√</font> | <font color=#07c160 size=5>√</font> |

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

### pnpm 常用指令

工作空间定义

```
pnpm-workspace.yaml

packages:
  - 'packages/**' # 组件库代码
  - docs

```

```
 package.json
"devDependencies": {
    "@be-ui/docs": "workspace:^1.0.0",
    ....
}
```

```
docs/package.json
{
  "name": "@be-ui/docs"
  ....
  }
```

-w 在工作目录中启动

pnpm install -D -w  
pnpm add package

pnpm update 根据指定的范围更新软件包的最新版本。
在不带参数的情况下使用时，将更新所有依赖关系。 您可以使用一些模式来更新特定的依赖项。  
pnpm up 遵循 package.json 指定的范围更新所有的依赖项  
pnpm up --latest 更新所有依赖项，此操作会忽略 package.json 指定的范围  
pnpm up foo@2 将 foo 更新到 v2 上的最新版本  
pnpm up "@babel/\*" 更新 @babel 范围内的所有依赖项

--prod, -P  
仅更新在 dependencies 和 optionalDependencies 中的依赖项。

--dev, -D  
仅更新在 devDependencies 中的依赖项。

pnpm env use --global 16  
甚至能指定使用的 node 版本

pnpm.overrides
此字段允许您指示 pnpm 覆盖依赖关系图中的任何依赖项。 这对于您强制所有的 packages 使用单个版本的依赖项，或做后移植的修复，或用一个 fork 来替换依赖项时将十分有用。

请注意，overrides 字段只能在项目的根目录下设置。

```
{
    "pnpm": {
        "overrides": {
            "foo": "^1.0.0",
            "quux": "npm:@myorg/quux@^1.0.0",
            "bar@^2.1.0": "3.0.0",
            "qar@1>zoo": "2"
        }
    }
}
```

peerDependencies 通常用来声明核心依赖库
假设插件 A 和插件 B 依赖于 Vue，如果放在 dependencies 中声明那么他们
都会安装 Vue 依赖，若子项目将其 Vue 声明在 peerDependencies 中
只要需要主项目 dependencies 中声明 Vue 即可，避免插件重复安装依赖

```
"peerDependencies": {
    "vue": "^3.2.33",
    "@vue/shared": "^3.2.33",
    "@popperjs/core": "^2.11.5"
  },
```
