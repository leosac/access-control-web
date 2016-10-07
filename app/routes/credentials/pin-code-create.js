import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Create PIN Code',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('pin-code');
    },
    resetController(controller, isExiting, transition)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod)
                mod.rollbackAttributes();
        }
    },
    actions:
    {
        createPin()
        {
            this.controller.get('model').save().then((pin) =>
                {
                    this.get('flashMessages').success('Pin successfully created.');
                    this.transitionTo('credentials.pin-code', pin.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while creating the PIN');
                });
        }
    }
});
