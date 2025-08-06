module.exports = function (environment) {
    let ENV = {
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

        intl: {
            defaultLocale: 'fr'
        },

        APP: {
            // IP:PORT of the leosac server.
            // If set to null, will try to use the value from
            // LEOSAC_ADDR environement variable.
            leosacAddr: null,
            //leosacAddr: '10.2.1.5:8888',
            appname: '__APP_NAME__',
            logoUrl: '/assets/images/logo.png',
            projectLogoUrl: '/assets/images/project-logo.png',
            siteUrl: 'leosac.com',
        }
    };

    // FlashMessages configuration
    ENV.flashMessageDefaults = {
        // flash message defaults
        timeout: 7000,
    };

    if (ENV.APP.leosacAddr === null) {
        ENV.APP.leosacAddr = process.env.LEOSAC_ADDR;
        if (ENV.APP.leosacAddr === null) {
            ENV.APP.leosacAddr = "ws://127.0.0.1:8888";
        }
    }

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'production') {
        if (process.env.LEOSAC_ROOT_URL !== null) {
            ENV.APP.rootURL = process.env.LEOSAC_ROOT_URL;
        }
        else
            ENV.rootURL = '/';
    }

    if (environment === 'test') {
        ENV.intl = ENV.intl || {};
        ENV.intl.suppressWarnings = true;
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
