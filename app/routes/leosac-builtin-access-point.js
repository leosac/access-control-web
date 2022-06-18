import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    _requireAuth: true,
    _title: 'leosac_builtin_ap.title',
    model(params) {
        return this.store.peekRecord('leosac-builtin-access-point', params.access_point_id);
    },
    actions: {

    }
});
