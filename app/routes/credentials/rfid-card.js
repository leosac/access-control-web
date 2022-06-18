import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'credentials.rfid_card.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.store.find('rfid-card', params.credential_id);
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
        updateCard()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.flashMessages.success('Credential successfully edited.');
                },
                () =>
                {
                    this.flashMessages.danger('An error occurred while editing credential');
                });
        },
        deleteCredential()
        {
            this.controller.get('model').destroyRecord().then(() =>
                {
                    this.flashMessages.success('Credential has been deleted.');
                    this.router.transitionTo('credentials.list');
                },
                () =>
                {
                    this.flashMessages.danger('Failed to delete credential.');
                });
        }
    }
});
