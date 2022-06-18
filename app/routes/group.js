import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'group.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.store.findRecord('group', params.group_id);
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
        editGroup ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.flashMessages.success('Group successfully edited.');
                },
                () =>
                {
                    this.flashMessages.danger('An error occurred while editing group');
                });
        },
        deleteGroup ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.flashMessages.success('Group has been deleted.');
                self.router.transitionTo('groups.list');
            });
        }
    }
});
