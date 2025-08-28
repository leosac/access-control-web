import Engine from 'ember-engines/engine';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';

const { modulePrefix } = config;
/**
 * in the dependencies, you can only share controllers, services
 *
 * In our case, the there some module that you must share:
 * - the store: it allow the engine to use the model of the application for example(this is needed by the authentication)
 * - websocket: ...
 * - leosac-info: there is some important information within the service, go check if you need it
 * - module-manager: needed to properly load the module
 * - search: if your engine has a model, it will allow you to search it from the global search on the side menu, but there is some things needed , like a backend search
 * - intl: Allow the engines to use the translations from the app
 *
 * Remember that this must be present in the app.js too, following this format:
 *  engineName: {
            leosacProperty: {
              // information provided in the module-config.json
            },
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
                externalRoutes: {
                    login: 'login',
                }
            }
 *
 * The external route allow the engine to use a route from the application.
 * please at least add the 'login' route
 * @type {void | *}
 */
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
