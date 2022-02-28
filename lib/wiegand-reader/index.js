/* eslint-env node */
'use strict';

const { buildEngine } = require('ember-engines/lib/engine-addon');

module.exports = buildEngine({
  name: 'wiegand-reader',

  lazyLoading: {
    enabled: true
  },

  isDevelopingAddon() {
    return true;
  }
});
