/*jshint node:true*/
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'wiegand-reader-wizard',
    environment: environment,

      i18n: {
          defaultLocale: 'en'
      }
  };

  return ENV;
};
