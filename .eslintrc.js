module.exports = {
  extends: 'airbnb-base',
  globals: {
    __fname: 'readonly',
    __line: 'readonly',
  },
  rules: {
    indent: ['error', 2, { MemberExpression: 0 }],
    'arrow-parens': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
  },
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  plugins: [
    'jest',
  ],
};
