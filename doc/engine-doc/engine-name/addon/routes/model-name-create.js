import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new record of the model.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'model-name.create';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('model-name');
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
