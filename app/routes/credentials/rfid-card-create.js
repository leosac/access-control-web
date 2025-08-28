import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'credentials.rfid_card_create.title';
    _requireAuth = true;

    model()
    {
        return this.store.createRecord('rfid-card');
    }

    resetController(controller, isExiting/*, transition*/)
    {
        // fixme Creating a credential and then hitting "back" will
        // still show an empty one in the list.

        // Somehow this resetController() hook is called AFTER the model()
        // hook on the page we are going to.
        // This seems to make little sense...
        // Our own helper, findAllCredentials may be causing trouble tho,
        // because it returns with toArray(), probably locking in some to-be-removed
        // objects.
        const mod = this.controller.model;
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    }
}
