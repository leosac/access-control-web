/*jshint node:true*/
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'smtp',
    environment: environment,
      i18n: {
          defaultLocale: 'fr'
      }
  };

  return ENV;
};
