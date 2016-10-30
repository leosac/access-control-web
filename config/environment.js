/* jshint node: true */

module.exports = function (environment)
{
    var ENV = {
        modulePrefix: 'web',
        environment: environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        i18n: {
            defaultLocale: 'fr'
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
            leosacAddr: '172.17.0.10:8888',
            appname: 'EvoXS Management Studio',
            logoUrl: 'http://terminator.islog.private:4200/assets/images/logo.png',
            siteUrl: 'izyx-systems.com',
        }
    };

    // FlashMessages configuration
    ENV.flashMessageDefaults = {
        // flash message defaults
        timeout: 7000,
    };

    if (environment === 'development')
    {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test')
    {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production')
    {

    }

    return ENV;
};
