import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new led config.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'leds.create';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('led');
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
