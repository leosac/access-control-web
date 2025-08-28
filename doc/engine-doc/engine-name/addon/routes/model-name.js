import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'model-name.title'; // this is an example of a translation key, up to you
    _requireAuth = true;

    model(params)
    {
        return this.store.findRecord('model-name', params.id);
    }

    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.model;
            if (mod)
                mod.rollbackAttributes();
        }
    }
}
