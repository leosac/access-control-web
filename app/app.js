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
                displayName: 'SMTP',
                entryPoint: '/',
                modelToRoute: {}
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
                    'search',
                    'i18n'
                ]
            }
        },
        pifaceDigitalGpio: {
            leosacProperty: {
                needServer: true,
                displayName: 'Piface Digital GPIO',
                entryPoint: '/list',
                modelToRoute: {
                    pifaceDigitalGpio: 'piface-digital-gpio'
                }
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
                    'search',
                    'i18n'
                ]
            }
        },
        ledBuzzer: {
            leosacProperty: {
                needServer: true,
                displayName: 'LED Buzzer',
                entryPoint: '/list',
                modelToRoute: {
                    led: 'led',
                    buzzer: 'buzzer'
                }
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
                    'search',
                    'i18n'
                ]
            }
        },
        wiegandReader: {
            leosacProperty: {
                needServer: true,
                displayName: 'Wiegand Reader',
                entryPoint: '/list',
                modelToRoute: {
                    wiegandReader: 'wiegand-reader'
                }
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
                    'search',
                    'i18n'
                ]
            }
        },
        wiegandReaderWizard: {
            leosacProperty: {
                needServer: false,
                displayName: 'Wiegand Reader Wizard',
                isWizard: true,
                entryPoint: '/',
                neededModule: [
                    "wiegandreader",
                    "pifacedigitalGPIO",
                    "LEDbuzzer"
                ],
                modelToRoute: {
                }
            },
            dependencies: {
                externalRoutes: {
                    login: 'login',
                    index: 'index'
                },
                services: [
                    'authentication',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
                    'module-manager',
                    'search',
                    'i18n'
                ]
            }
        }
    },
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
