import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

// Engine name must be camelcased while the repo name and the route must be dasherized

App = Ember.Application.extend({
    engines:
	__REPLACE_ME__
    ,
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
