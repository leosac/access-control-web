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

                    // We create an object of type access point in the browser's memory.
                    // However, server-side the object will have a concrete subtype.
                    // So we just unload this temporary object, and we will get a fresh copy
                    // with the correct underlying type when et reach the /access-point page.
                    const id = ap.get('id');
                    ap.unloadRecord();
                    this.transitionTo('access-point', id);
                },
                () =>
                {
                    this.get('flashMessages').danger('Failed to create Access Point.');
                });
        }
    }
});
