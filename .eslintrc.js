module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: {order: 'asc', caseInsensitive: true},
      },
    ],
    'react/no-unstable-nested-components': [
      'off' | 'warn' | 'error',
      {
        allowAsProps: true | false,
        customValidators:
          [] /* optional array of validators used for propTypes validation */,
      },
    ],
    'no-bitwise': ['error', {allow: ['~', '|']}],
  },
};
