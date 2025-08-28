import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'credentials.pin_code_create.title';
    _requireAuth = true;
    
    model()
    {
        return this.store.createRecord('pin-code');
    }

    resetController(controller, isExiting)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.model;
            if (mod.get('isNew')) {
                mod.unloadRecord();
            }
        }
    }
}
