import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'schedule.create.title',
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
        createSchedule(){
            this.controller.model.save().then(()=>
            {
                this.get('flashMessages').success('Schedule created !');
                this.transitionTo('schedule', this.controller.model.get('id'));
            });
        }
    }
});
