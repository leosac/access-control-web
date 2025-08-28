import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new door.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'access-point.create.title';
    _requireAuth = true;

    model()
    {
        // Temporary record just for the view
        return this.store.createRecord('access-point', { controllerModule: 'LEOSAC-BUILTIN-ACCESS-POINT' });
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
