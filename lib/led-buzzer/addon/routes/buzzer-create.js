import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new buzzer config.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'buzzers.create';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('buzzer');
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
