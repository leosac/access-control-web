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
        return this.get('store').findRecord('zone', params.zone_id);
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
