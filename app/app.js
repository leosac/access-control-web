import Application from '@ember/application';
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

// Engine name must be camelcased while the repo name and the route must be dasherized

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Application.extend({
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
                    'intl'
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
                    'intl'
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
                    'intl'
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
                    'intl'
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
                    'intl'
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
