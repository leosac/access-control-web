import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new piface-digital.gpio config.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'piface-digital-gpios.create.title';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('piface-digital-gpio');
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
