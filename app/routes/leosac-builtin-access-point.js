import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _requireAuth: true,
    _title: 'leosac_builtin_ap.title',
    model(params) {
        return this.get('store').peekRecord('leosac-builtin-access-point', params.access_point_id);
    },
    actions: {

    }
});
