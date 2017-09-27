import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';
import Ember from 'ember';

const { modulePrefix } = config;

const Eng = Engine.extend({
    modulePrefix,
    Resolver,
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
    },
    moduleManager: Ember.inject.service('module-manager'),
    init() {
        this._super(...arguments);
        this.get('moduleManager').addModule('smtp');
    }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
