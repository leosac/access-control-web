import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.get('store').peekRecord('leosac-builtin-access-point', params.access_point_id);
    },
    actions: {

    }
});
