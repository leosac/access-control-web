import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'zone.tree_view',
    _requireAuth: true,

    model() {
        return this.get('store').findAll('zone');
    }
});
