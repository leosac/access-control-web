import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import 'ember-power-select/styles';

let App;

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
        'piface-digital-gpio': {
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
        'led-buzzer': {
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
        'wiegand-reader': {
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
        'wiegand-reader-wizard': {
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
