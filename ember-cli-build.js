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

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');
    app.import('node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.min.css');
    app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
    app.import('node_modules/jquery/dist/jquery.min.js');
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
