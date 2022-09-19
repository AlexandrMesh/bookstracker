module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jest'],
  rules: {
    'no-shadow': 'off',
    'arrow-parens': ['error'],
    'object-curly-newline': ['error', { consistent: true }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'linebreak-style': 0,
    'max-len': ['error', { code: 150 }],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
