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
            // IP:PORT of the leosac server.
            // If set to null, will try to use the value from
            // LEOSAC_ADDR environement variable.
            leosacAddr: null,
            //leosacAddr: '10.2.1.5:8888',
            appname: 'Leosac Graphical User Interface',
            pathToEveryImage: '/assets/leosac/',
            logoUrl: '/assets/leosac/logo.png',
            siteUrl: 'leosac.com',
            fingerprint: {
                prepend: 'https://leosac.com/'
            }
        }
    };

    // FlashMessages configuration
    ENV.flashMessageDefaults = {
        // flash message defaults
        timeout: 7000,
    };

    if (ENV.APP.leosacAddr === null)
    {
        ENV.APP.leosacAddr = process.env.LEOSAC_ADDR;
    }

    if (environment === 'development')
    {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'production') {
        ENV.rootURL = '/dist';
    }

    if (environment === 'test')
    {
        ENV.i18n = ENV.i18n || {};
        ENV.i18n.suppressWarnings = true;
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
