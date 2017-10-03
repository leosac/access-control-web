/* eslint-env node */
'use strict';

const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
    name: 'smtp',
    lazyLoading: true,

    isDevelopingAddon() {
        return true;
    }
});
