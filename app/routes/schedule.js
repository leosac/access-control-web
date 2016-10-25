import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Schedule',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('schedule', params.schedule_id);
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
        editSchedule ()
        {
            const self = this;
            self.controller.get('model').save().then(() =>
                {
                    this.get('flashMessages').success('Schedule successfully edited.');
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while editing schedule.');
                });
        },
        addMapping ()
        {
            const newMapping = this.get('store').createRecord('schedule-mapping');
            newMapping.set('alias', 'Unnamed mapping');
            this.controller.get('model').get('mapping').addObject(newMapping);
        },
        removeMapping (mapping)
        {
            this.controller.get('model').get('mapping').removeObject(mapping);
        }
    }
});
