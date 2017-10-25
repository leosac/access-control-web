import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    store: Ember.inject.service('store'),
    allGpio: [],
    arrayOfDeviceClass: [1],

    init() {
        this._super(...arguments);
    },

    actions: {
    }
});
