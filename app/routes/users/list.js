import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    _title: 'users.list.title',
    _requireAuth: true,
    model()
    {
        "use strict";
        return this.store.findAll('user');
    },
});
