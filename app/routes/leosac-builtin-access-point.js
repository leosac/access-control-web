import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class LeosacBuiltinAccessPointRoute extends LeosacRoute {
    @service
    store;
    _requireAuth = true;
    _title = 'leosac_builtin_ap.title';

    model(params) {
        return this.store.peekRecord('leosac-builtin-access-point', params.access_point_id);
    }
}
