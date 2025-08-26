import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class DoorRoute extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service
    flashMessages;
    _title = 'door.title';
    _requireAuth = true;

    beforeModel()
    {
        "use strict";
        return this._super();
    }

    model(params)
    {
        "use strict";
        // fixme: THIS IS AN HORRIBLE HACK !
        // The alias of the linked AP didn't show in the view for
        // some unknown reason, despite the relationship being fetched.
        // This is really horrible because it loads all AP to make sure
        // they are present in memory when the door is loaded.
        // It works, but THIS NEEDS FIXING.
        // fixme FIX ME PLS
        return this.store.findAll('access-point').then(() =>
        {
            return this.store.findRecord('door', params.id);
        });
    }

    resetController(controller, isExiting/*, transition*/)
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
