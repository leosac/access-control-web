import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    flashMessages: service(),
    _title: 'schedule.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.findAll('schedule', {reload:true});
    },
    actions:
    {
        deleteSchedule(scheduleId)
        {
            const model = this.store.peekRecord('schedule', scheduleId);
            if (model)
            {
                model.destroyRecord({}).then(() =>
                {
                    this.flashMessages.success('Schedule has been deleted.');
                    this.router.transitionTo('schedules.list');
                });
            }
        }
    }
});
