const { PRE_COMMIT } = process.env

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'last',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': ['error', {}],
    eqeqeq: ['warn', 'always', { null: 'ignore' }],
    'no-else-return': ['warn', { allowElseIf: false }],
    'no-useless-return': 'warn',
    'no-var': 'warn',
    'object-shorthand': [
      'warn',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true
      }
    ],
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true
      }
    ],
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: true
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'prefer-template': 'warn',
    'no-param-reassign': ['warn', { props: false }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false, typedefs: false }],
    'no-debugger': PRE_COMMIT ? 'error' : 'off',
    'no-console': PRE_COMMIT ? 'error' : 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
