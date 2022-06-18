import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    _title: 'zone.tree_view',
    _requireAuth: true,

    model() {
        return this.store.findAll('zone');
    }
});
