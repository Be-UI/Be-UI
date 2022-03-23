module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
  ],
  plugins: ['prettier'], // ++
  rules: {
    'prettier/prettier': 'error', // ++
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          Function: false,
        },
      },
    ],
    'vue/no-unused-components': ['warn'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/require-default-prop': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['off'],
    'vue/no-v-html': ['off'],
  },
}
