import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';

const { modulePrefix } = config;

const Eng = Engine.extend({
    modulePrefix,
    Resolver,
    dependencies: {
        services: [
            'router',
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
    }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
