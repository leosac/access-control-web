import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class ScheduleMappingPicker extends Component {
    @service
    store;

    @service
    search;

    // `action`

    selectedSchedule = null;
    selectedMapping = null;

    @action
    searchSchedule(partialName) {
        return this.search.findScheduleByName(partialName);
    }

    @action
    scheduleChanged(newSchedule) {
        this.selectedMapping = null;
        this.store.findRecord('schedule', newSchedule.id).then((sched) =>
        {
            this.selectedSchedule = sched;
        });
    }

    @action
    scheduleMappingPicked() {
        const picked = thisselectedMapping;
        this.selectedMapping = null;

        if (picked) {
            this.args.action(picked);
        } else {
            console.log("PLS PICK SOMETHING");
        }
    }
}
