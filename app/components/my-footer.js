import Ember from 'ember';

export default Ember.Component.extend({
    globalInfo: Ember.inject.service('leosac-info'),
    ws: Ember.inject.service('websocket'),

    init() {
        this._super(...arguments);
    },

});
