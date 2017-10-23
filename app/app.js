import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

// Engine name must be camelcased while the repo name and the route must be dasherized

App = Ember.Application.extend({
    engines: {
        smtp: {
            leosacProperty: {
                needServer: true,
                displayName: 'SMTP'
            },
            dependencies: {
                externalRoutes: {
                    login: 'login'
                },
                services: [
                    'authentication',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
                    'module-manager'
                ]
            }
        },
        pifaceDigitalGpio: {
            leosacProperty: {
                needServer: true,
                displayName: 'Piface Digital GPIO'
            },
            dependencies: {
                externalRoutes: {
                    login: 'login'
                },
                services: [
                    'authentication',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
                    'module-manager'
                ]
            }
        },
        ledBuzzer: {
            leosacProperty: {
                needServer: true,
                displayName: 'LED Buzzer'
            },
            dependencies: {
                externalRoutes: {
                    login: 'login'
                },
                services: [
                    'authentication',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
                    'module-manager',
                    'search'
                ]
            }
        },
        wiegandReader: {
            leosacProperty: {
                needServer: true,
                displayName: 'Wiegand Reader'
            },
            dependencies: {
                externalRoutes: {
                    login: 'login'
                },
                services: [
                    'authentication',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
                    'module-manager',
                    'search'
                ]
            }
        },
    },
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
