import Ember from 'ember';
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
        return this.get('store').findRecord('access-point', params.access_point_id);
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
        }
    }
});
