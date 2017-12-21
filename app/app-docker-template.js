import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

// This file is similar to app.js.
// It is used when building the web application through docker.
//
// This allows to customization which engine are built with the application.

// The build process will replace __REPLACE__ME with a proper json configuration
// for the selected engines.

App = Ember.Application.extend({
__REPLACE_ME__
    ,
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
