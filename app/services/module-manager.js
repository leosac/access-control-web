import Ember from 'ember';
import App from '../app';

/**
 * This service will help us manage every module that are in our application,
 */

export default Ember.Service.extend({
    ws: Ember.inject.service('websocket'),
    info: Ember.inject.service('leosac-info'),
    store: Ember.inject.service('store'),
    availableModule: [],
    init() {
      this._super(...arguments);
    },

    fetchModule()
    {
        let container = Ember.getOwner(this).lookup('application:main').engines;
        // let object = container;
        // console.log(object);
        // console.log(object);
        //        container.forEach(function(module) {
        //         console.log(module);
        //    });

      return this.get('availableModule');
    },

    addModule(module)
    {
        this.get('availableModule').push(module);
        console.log(this.get('availableModule'));
    }
});
