module.exports = {
  globals: {
    // work around: https://github.com/kulshekhar/ts-jest/issues/748#issuecomment-423528659
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              targets: {
                node: true,
              },
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          '@vue/babel-plugin-jsx',
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  // u can change this option to a more specific folder for test single component or util when dev
  // for example, ['<rootDir>/packages/input']

  roots: ['<rootDir>'],

  //roots: ['<rootDir>/packages/components/svg-icon'],
  // roots: ['<rootDir>/packages/components/tag'],
  // roots: ['<rootDir>/packages/components/message'],
   //roots: ['<rootDir>/packages/components/input-number'],
   //roots: ['<rootDir>/packages/components/switch'],
  // roots: ['<rootDir>/packages/components/breadcrumb'],
  // roots: ['<rootDir>/packages/components/contextmenu'],
  // roots: ['<rootDir>/packages/components/container'],
  //  roots: ['<rootDir>/packages/components/ellipsis'],
  // roots: ['<rootDir>/packages/components/button'],
  // roots: ['<rootDir>/packages/components/message-box/'],
  // roots: ['<rootDir>/packages/components/dialog'],
  // roots: ['<rootDir>/packages/components/loading'],
  // roots: ['<rootDir>/packages/components/progress'],
}
