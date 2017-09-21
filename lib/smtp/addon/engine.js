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
        //'leosac-route',
        'authentication',
        'websocket',
        'leosac-info',
        'flashMessages',
        'store'
    ],
      externalRoutes: [
          'login'
      ]
  }
});

loadInitializers(Eng, modulePrefix);

export default Eng;
