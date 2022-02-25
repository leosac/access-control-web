/*jshint node:true*/
'use strict';

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'led-buzzer',
        environment: environment,
        intl: {
            defaultLocale: 'en'
        },
    };

    return ENV;
};
