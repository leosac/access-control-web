/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
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

  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
    {destDir: 'fonts'});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff',
    {destDir: 'fonts'});

  app.import('app/styles/form-signin.css');

  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/metisMenu/dist/metisMenu.min.css');

  app.import('bower_components/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css');
  app.import('bower_components/startbootstrap-sb-admin-2/dist/css/timeline.css');

  app.import('bower_components/morrisjs/morris.css');
  app.import('bower_components/font-awesome/css/font-awesome.min.css');

  //app.import('bower_components/jquery/dist/jquery.min.js');
  app.import('bower_components/metisMenu/dist/metisMenu.min.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
  //app.import('bower_components/raphael/raphael-min.js');
  app.import('bower_components/morrisjs/morris.min.js');

  app.import('bower_components/startbootstrap-sb-admin-2/dist/js/sb-admin-2.js');
  return app.toTree();
};
