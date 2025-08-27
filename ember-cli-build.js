/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults)
{
  const { setConfig } = await import('@warp-drive/build-config');

    const app = new EmberApp(defaults, {
      babel: {
        plugins: [require.resolve('ember-auto-import/babel-plugin')],
      },

      autoImport: {
      },

    	'ember-power-select': {
        theme: 'bootstrap'
    	},

    	'ember-bootstrap': {
        'bootstrapVersion': 4,
        'importBootstrapCSS': false,
        'insertEmberWormholeElementToDom': false
    	},

      fingerprint: {
        enabled: false
      }
    });

    app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');
    app.import('node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.min.css');
    app.import('node_modules/jstree/dist/themes/default/style.min.css');
    app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
    app.import('node_modules/jquery/dist/jquery.min.js');
    app.import('node_modules/jstree/dist/jstree.min.js');
    //app.import('node_modules/startbootstrap-sb-admin-2-blackrockdigital/js/sb-admin-2.js');

    setConfig(app, __dirname, { 
      // this should be the most recent <major>.<minor> version for
      // which all deprecations have been fully resolved
      // and should be updated when that changes
      compatWith: '4.12',
      deprecations: {
        // ... list individual deprecations that have been resolved here
      }
    });

    return app.toTree();
};
