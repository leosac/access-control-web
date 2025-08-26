import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class ZoneOverviewRoute extends LeosacRoute {
    @service
    store;
    _title = 'zone.tree_view';
    _requireAuth = true;

    model() {
        return this.store.findAll('zone');
    }
}
