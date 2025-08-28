import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class AccessPointRoute extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service
    flashMessages;
    _title = 'access-point.title';
    _requireAuth = true;

    model(params)
    {
        return this.store.findRecord('access-point', params.id);
    }

    resetController(controller, isExiting)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod) {
                mod.rollbackAttributes();
            }
        }
    }
}
