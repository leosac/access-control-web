import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'access-point.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('access-point', params.id);
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
        editAP ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.get('flashMessages').success('Access Point successfully edited.');
                    this.transitionTo('access-point', this.controller.get('model').get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while editing Access Point.');
                });
        },
        deleteAP ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Access Point has been deleted.');
                self.transitionTo('access-points.list');
            });
        }
    }
});
