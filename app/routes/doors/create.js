import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new door.
 */
export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'door.create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.createRecord('door');
    },
    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.get('model');
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    },
    actions: {
        createDoor()
        {
            this.modelFor('doors.create').save().then((d) =>
                {
                    this.flashMessages.success('Door created.');
                    this.router.transitionTo('door', d.get('id'));
                },
                () =>
                {
                    this.flashMessages.danger('Failed to create door.');
                });
        }
    }
});
