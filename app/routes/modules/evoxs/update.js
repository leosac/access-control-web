import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'evoxs.update.title',
    _requireAuth: true,
    updater: Ember.inject.service('update'),

    model(params)
    {
        return this.get('updater').getUpdate(Number.parseInt(params.update_id));
    },
});
