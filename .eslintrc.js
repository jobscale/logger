module.exports = {
  extends: 'airbnb-base',
  globals: {
  },
  rules: {
    indent: ['error', 2, { MemberExpression: 0 }],
    'no-trailing-spaces': 'error',
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
  },
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2023,
  },
  plugins: [
    'jest',
  ],
  overrides: [{
    files: ['*.mjs'],
    parserOptions: {
      sourceType: 'module',
    },
  }],
};
