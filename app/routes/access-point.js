import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'access-point.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.store.findRecord('access-point', params.id);
    },
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
    },
    actions: {
        editAP ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.flashMessages.success('Access Point successfully edited.');
                    this.router.transitionTo('access-point', this.controller.get('model').get('id'));
                },
                () =>
                {
                    this.flashMessages.danger('An error occurred while editing Access Point.');
                });
        },
        deleteAP ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.flashMessages.success('Access Point has been deleted.');
                self.router.transitionTo('access-points.list');
            });
        }
    }
});
