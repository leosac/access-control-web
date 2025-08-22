/*eslint-env node*/
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
	plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
	],
  env: {
    'es6': true,
    'jquery': true,
    browser: true
  },
  rules: {
    'no-console': 'off',
	   'ember/no-jquery': 'error'
  },
};
