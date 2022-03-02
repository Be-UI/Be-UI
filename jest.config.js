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
        '^.+\\.vue$': 'vue-jest',
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
                    ['@babel/plugin-proposal-class-properties', {loose: true}],
                ],
            },
        ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    // u can change this option to a more specific folder for test single component or util when dev
    // for example, ['<rootDir>/packages/input']

    // roots: ['<rootDir>'],

    //roots: ['<rootDir>/src/components/svg-icon'],
    // roots: ['<rootDir>/src/components/tag'],
    //roots: ['<rootDir>/src/components/message'],
    // roots: ['<rootDir>/src/components/input-number'],
    // roots: ['<rootDir>/src/components/switch'],
    // roots: ['<rootDir>/src/components/breadcrumb'],
    // roots: ['<rootDir>/src/components/contextmenu'],
    // roots: ['<rootDir>/src/components/container'],
    // roots: ['<rootDir>/src/components/ellipsis'],
    //roots: ['<rootDir>/src/components/button'],
    // roots: ['<rootDir>/src/components/message-box/'],
    // roots: ['<rootDir>/src/components/dialog'],
    // roots: ['<rootDir>/src/components/loading'],
    roots: ['<rootDir>/src/components/progress'],
}
