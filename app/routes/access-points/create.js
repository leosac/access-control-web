import LeosacRoute from 'web/leosac-route';

/**
 * Create a new door.
 */
export default LeosacRoute.extend({
    _title: 'Create Access Point',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('access-point');
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
        createAP()
        {
            this.modelFor('access-points.create').save().then((ap) =>
                {
                    this.get('flashMessages').success('Access Point created.');
                    this.transitionTo('access-point', ap.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('Failed to create Access Point.');
                });
        }
    }
});
