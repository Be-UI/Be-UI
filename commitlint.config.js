module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feats', 'fix', 'doc', 'style', 'refactor', 'test', 'revert', 'build', 'ci', 'perf', 'conf']
    ]
  }
};