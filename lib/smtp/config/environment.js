/*jshint node:true*/
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'smtp',
    environment: environment,
    intl: {
      defaultLocale: 'fr'
    }
  };

  return ENV;
};
