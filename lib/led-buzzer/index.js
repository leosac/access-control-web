const { buildEngine } = require('ember-engines/lib/engine-addon');

module.exports = buildEngine({
  name: 'led-buzzer',
  lazyLoading: {
    enabled: true
  },
  isDevelopingAddon() {
    return true;
  }
});
