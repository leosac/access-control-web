import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class ZoneOverviewRoute extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service
    flashMessages;
    _title = 'zone.title';
    _requireAuth = true;

    model(params)
    {
        return this.store.findRecord('zone', params.zone_id);
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
