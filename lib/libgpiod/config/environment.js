/*jshint node:true*/
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'libgpiod',
    environment: environment,
    intl: {
      defaultLocale: 'en'
    },

  };

  return ENV;
};
