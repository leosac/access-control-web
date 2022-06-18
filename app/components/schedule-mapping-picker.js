import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    store: service(),
    search: service(),
    // `action`

    selectedSchedule: null,
    selectedMapping: null,

    actions:
    {
        searchSchedule(partialName)
        {
            return this.search.findScheduleByName(partialName);
        },
        scheduleChanged(newSchedule)
        {
            const self = this;
            this.set('selectedMapping', null);
            this.store.find('schedule', newSchedule.id).then((sched) =>
            {
                self.set('selectedSchedule', sched);
            });
        },
        scheduleMappingPicked()
        {
            const picked = this.get('selectedMapping');
            this.set('selectedMapping', null);

            if (picked) {
                this.get('action')(picked);
            } else {
                console.log("PLS PICK SOMETHING");
            }
        }
    }
});
