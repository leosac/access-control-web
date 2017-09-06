import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

App = Ember.Application.extend({
    engines: {
        smtp: {
            dependencies: {
                externalRoutes: {
                    home: 'home',
                    settings: 'settings'
                },
                services: [
                    // 'leosac-info',
                    // 'authentication',
                    // 'websocket',
                    'store',
                    // need the service leosac-info
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
