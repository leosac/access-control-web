import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'New Schedule',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const sched = this.get('store').createRecord('schedule');
        return sched;
    },
    actions: {
        createSchedule(){
            this.controller.model.save().then(()=>{
                this.get('flashMessages').success('Schedule created !');
                this.transitionTo('schedule', this.controller.model.get('id'));
            });
        }
    }
});
