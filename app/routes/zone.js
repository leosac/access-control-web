import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'zone.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.store.findRecord('zone', params.zone_id);
    },
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
    },
    actions: {
        editZone ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.flashMessages.success('Zone successfully edited.');
                    this.router.transitionTo('zone', this.controller.get('model').get('id'));
                },
                () =>
                {
                    this.flashMessages.danger('An error occurred while editing zone');
                });
        },
        deleteZone ()
        {
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                this.flashMessages.success('Zone has been deleted.');
                this.router.transitionTo('zones.list');
            });
        }
    }
});
