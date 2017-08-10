import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'zone.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        // fixme: THIS IS AN HORRIBLE HACK !
        // The alias of the linked door didn't show in the view for
        // some unknown reason, despite the relationship being fetched.
        // This is really horrible because it loads all door to make sure
        // they are present in memory when the zone is loaded.
        // It works, but THIS NEEDS FIXING.
        // fixme FIX ME PLS
        return this.get('store').findAll('door').then(() =>
        {
            return this.get('store').findRecord('zone', params.zone_id);
        });
    },
    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod)
                mod.rollbackAttributes();
        }
    },
    actions: {
        editZone ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.get('flashMessages').success('Zone successfully edited.');
                    this.transitionTo('zone', this.controller.get('model').get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while editing zone');
                });
        },
        deleteZone ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Zone has been deleted.');
                self.transitionTo('zones.list');
            });
        }
    }
});