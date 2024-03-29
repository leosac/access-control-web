/*eslint-env node*/
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
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
