import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.warn = function(i){
    let str1 = 'i18n';
    if (!str1.localeCompare(i))
        console.warn(i);
};

App = Ember.Application.extend({
    engines: {
        smtp: {
            dependencies: {
                externalRoutes: {
                    home: 'home',
                    settings: 'settings'
                },
                services: [
                    'authentication',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
                ]
            }
        },
        evoxs: {
            dependencies: {
                externalRoutes: {
                    home: 'home',
                    settings: 'settings'
                },
                services: [
                    'authentication',
		    'search',
                    'websocket',
                    'leosac-info',
                    'flashMessages',
                    'store',
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
