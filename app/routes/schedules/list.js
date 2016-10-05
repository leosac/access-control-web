import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Schedule list',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').findAll('schedule', {reload:true});
    },
    actions:
    {
        deleteSchedule(scheduleId)
        {
            const self = this;
            const model = this.get('store').peekRecord('schedule', scheduleId);
            if (model)
            {
                model.destroyRecord({}).then(() =>
                {
                    self.get('flashMessages').success('Schedule has been deleted.');
                    self.transitionTo('schedules.list');
                });
            }
        }
    }
});
