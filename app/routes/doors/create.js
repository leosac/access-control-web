import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new door.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'door.create.title';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('door');
    }

    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.model;
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    }
}
