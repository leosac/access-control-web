/*eslint-env node*/
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    extends: 'eslint:recommended',
    env: {
        "es6": true,
        "jquery": true,
        browser: true
    },
    rules: {
        "no-console": "off"
    },
};
