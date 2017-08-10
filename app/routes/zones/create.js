import LeosacRoute from 'web/leosac-route';

/**
 * Create a new zone.
 */
export default LeosacRoute.extend({
    _title: 'zone.create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('zone');
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
        createZone()
        {
            this.modelFor('zones.create').save().then((d) =>
                {
                    console.log("success");
                    this.get('flashMessages').success('Zone created.');
                    this.transitionTo('zone', d.get('id'));
                },
                () =>
                {
                    console.log("fail");
                    this.get('flashMessages').danger('Failed to create zone.');
                });
        }
    }
});
