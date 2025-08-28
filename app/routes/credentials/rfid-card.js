import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'credentials.rfid_card.title';
    _requireAuth = true;
    
    
    model(params)
    {
        return this.store.findRecord('rfid-card', params.credential_id);
    }

    resetController(controller, isExiting)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.model;
            if (mod) {
                mod.rollbackAttributes();
            }
        }
    }
}
