import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';
import Ember from 'ember';

const { modulePrefix } = config;

const Eng = Engine.extend({
    Resolver,
    modulePrefix,
    dependencies: {
        services: [
            //'leosac-route',
            'authentication',
            'websocket',
            'leosac-info',
            'flashMessages',
            'store',
            'module-manager'
        ],
        externalRoutes: [
            'login'
        ]
    }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
