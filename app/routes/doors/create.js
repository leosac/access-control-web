import LeosacRoute from 'web/leosac-route';

/**
 * Create a new door.
 */
export default LeosacRoute.extend({
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
        return this.get('store').createRecord('door');
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
