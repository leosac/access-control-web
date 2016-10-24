import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    search: Ember.inject.service('search'),
    // `action`

    selectedSchedule: null,
    selectedMapping: null,

    actions:
    {
        searchSchedule(partialName)
        {
            return this.get('search').findScheduleByName(partialName);
        },
        scheduleChanged(newSchedule)
        {
            const self = this;
            this.set('selectedMapping', null);
            this.get('store').find('schedule', newSchedule.id).then((sched) =>
            {
                self.set('selectedSchedule', sched);
            });
        },
        scheduleMappingPicked()
        {
            const picked = this.get('selectedMapping');
            this.set('selectedMapping', null);

            if (picked)
                this.get('action')(picked);
            else
                console.log("PLS PICK SOMETHING");
        }
    }
});
