/* eslint-env node */
'use strict';

const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: 'engine-name',

  options: {
    autoImport: { },
  },

  lazyLoading: {
    enabled: true
  },

  isDevelopingAddon() {
    return true;
  }
});
