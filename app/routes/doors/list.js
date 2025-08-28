import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'door.list.title';
    _requireAuth = true;
    
    model()
    {
        "use strict";
        return this.store.findAll('door', {reload: true});
    }
}
