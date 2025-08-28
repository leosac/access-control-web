import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'users.list.title';
    _requireAuth = true;

    model()
    {
        return this.store.findAll('user');
    }
}
