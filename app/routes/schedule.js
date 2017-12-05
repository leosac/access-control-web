import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'schedule.title',
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
        editSchedule ()
        {
            const self = this;
            let i = 0;

            self.controller.get('model').get('mapping').forEach(() => {
                i++;
            });
            console.log(i);
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
            let modeltest = this.controller.get('model');
            let i = 0;
            modeltest.get('mapping').forEach((mapping) => {
                i++;
            });
            console.log('i first round = ' + i);
            newMapping.set('alias', 'Unnamed mapping');
            this.controller.get('model').get('mapping').addObject(newMapping);
            let model = this.controller.get('model');
            i = 0;
            model.get('mapping').forEach((mapping) => {
                i++;
            });
            console.log('i second round = ' + i);
        },
        removeMapping (mapping)
        {
            this.controller.get('model').get('mapping').removeObject(mapping);
        },
        deleteSchedule()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Schedule has been deleted.');
                self.transitionTo('schedules.list');
            });
        }
    }
});
