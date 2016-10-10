import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Group',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('door', params.door_id);
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
        editDoor ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.get('flashMessages').success('Door successfully edited.');
                    this.transitionTo('door', this.controller.get('model').get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while editing door');
                });
        },
        deleteDoor ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Door has been deleted.');
                self.transitionTo('doors.list');
            });
        }
    }
});
