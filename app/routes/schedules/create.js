import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'schedule.create.title';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('schedule');
    }
    
    resetController(controller, isExiting/*, transition*/)
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
