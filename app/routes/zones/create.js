import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new zone.
 */
export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'zone.create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.createRecord('zone');
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
        createZone()
        {
            this.modelFor('zones.create').save().then((d) =>
                {
                    this.flashMessages.success('Zone created.');
                    this.router.transitionTo('zone', d.get('id'));
                },
                () =>
                {
                    this.flashMessages.danger('Failed to create zone.');
                });
        }
    }
});
