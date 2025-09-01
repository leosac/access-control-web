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
    app.import('node_modules/@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css');

    // these manual imports are required because of sb-admin-2 and tempus-dominus...
    app.import('node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css');
    app.import('node_modules/@fortawesome/fontawesome-svg-core/css/styles.css');
    //app.import('node_modules/startbootstrap-sb-admin-2/node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf', { destDir: 'webfonts' });
    ///app.import('node_modules/startbootstrap-sb-admin-2/node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff', { destDir: 'webfonts' });
    //app.import('node_modules/startbootstrap-sb-admin-2/node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2', { destDir: 'webfonts' });
    app.import('node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2', { destDir: 'webfonts' });
    app.import('node_modules/@fortawesome/fontawesome-free/css/solid.min.css');

    app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
    app.import('node_modules/jquery/dist/jquery.min.js');
    app.import('node_modules/jstree/dist/jstree.min.js');
    app.import('node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.min.js');
    //app.import('node_modules/startbootstrap-sb-admin-2-blackrockdigital/js/sb-admin-2.js');
  

    setConfig(app, __dirname, { 
      // this should be the most recent <major>.<minor> version for
      // which all deprecations have been fully resolved
      // and should be updated when that changes
      compatWith: '4.12',
      deprecations: {
        DEPRECATE_TRACKING_PACKAGE: false,
      }
    });

    return app.toTree();
};
