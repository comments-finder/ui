/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    'quotes': [1, 'single'],
    'indent': [1, 2],
    'import/order': [1, {
      'newlines-between': 'always',
    }],
    'max-len': [1, 120],
    'react-hooks/exhaustive-deps': 0
  }
};
