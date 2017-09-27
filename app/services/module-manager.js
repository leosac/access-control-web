import Ember from 'ember';
import App from '../app';

/**
 * This service will help us mange every module that are in our application,
 */

export default Ember.Service.extend({
    ws: Ember.inject.service('websocket'),
    info: Ember.inject.service('leosac-info'),
    availableModule: [],

    addModule(module)
    {
        this.get('availableModule').push(module);
        console.log(this.get('availableModule'));
    }
});
