import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'access-point.list.title';
    _requireAuth = true;

    model()
    {
        return this.store.peekAll('access-point');
    }
}
