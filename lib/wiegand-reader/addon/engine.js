import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';

const { modulePrefix } = config;

export default class Eng extends Engine {
    Resolver = Resolver;
    modulePrefix = modulePrefix;
    dependencies = {
        services: [
            //'leosac-route',
            'authentication',
            'websocket',
            'leosac-info',
            'flashMessages',
            'store',
            'module-manager',
            'search',
            'intl'
        ],
        externalRoutes: [
            'login'
        ]
    };
}

loadInitializers(Eng, modulePrefix);
