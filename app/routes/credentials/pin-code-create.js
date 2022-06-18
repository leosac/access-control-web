import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'credentials.pin_code_create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.createRecord('pin-code');
    },
    resetController(controller, isExiting)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod.get('isNew')) {
                mod.unloadRecord();
            }
        }
    },
    actions:
    {
        createPin() {
            this.controller.get('model').save().then((pin) => {
                    this.flashMessages.success('Pin successfully created.');
                    this.router.transitionTo('credentials.pin-code', pin.get('id'));
                },
                () => {
                    this.flashMessages.danger('An error occurred while creating the PIN');
                });
        }
    }
});
