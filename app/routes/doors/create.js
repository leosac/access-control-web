import LeosacRoute from 'web/leosac-route';

/**
 * Create a new door.
 */
export default LeosacRoute.extend({
    _title: 'Create door',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('door');
    },
    resetController(controller, isExiting, transition)
    {
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod)
                mod.unloadRecord();
        }
    },
    actions: {
        createDoor()
        {
            this.modelFor('doors.create').save().then((d) =>
                {
                    this.get('flashMessages').success('Door created.');
                    this.transitionTo('door', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('Failed to create door.');
                });
        }
    }
});
