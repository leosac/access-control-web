import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new zone.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'zone.create.title';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('zone');
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
