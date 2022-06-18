import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessage: service('flash-messages'),
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
        return this.store.findRecord('schedule', params.schedule_id);
    },
    resetController(controller, isExiting/*, transition*/)
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
        editSchedule ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.flashMessages.success('Schedule successfully edited.');
                },
                () =>
                {
                    this.flashMessages.danger('An error occurred while editing schedule.');
                });
        },
        addMapping ()
        {
            const newMapping = this.store.createRecord('schedule-mapping');
            newMapping.set('alias', 'Unnamed mapping');
            this.controller.get('model').get('mapping').addObject(newMapping);
        },
        removeMapping (mapping)
        {
            this.controller.get('model').get('mapping').removeObject(mapping);
        },
        deleteSchedule()
        {
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                this.flashMessages.success('Schedule has been deleted.');
                this.router.transitionTo('schedules.list');
            });
        }
    }
});
