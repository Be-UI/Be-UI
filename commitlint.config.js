// 已经按照官网进行配置 但是不生效，使用webstorm插件作为本地校验吧
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'doc', 'style', 'refactor', 'test', 'revert', 'build', 'ci', 'perf', 'conf']
    ]
  }
};