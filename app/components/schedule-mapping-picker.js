import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@emglimmerber/component';

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
        const self = this;
        this.set('selectedMapping', null);
        this.store.find('schedule', newSchedule.id).then((sched) =>
        {
            self.set('selectedSchedule', sched);
        });
    }

    @action
    scheduleMappingPicked() {
        const picked = this.get('selectedMapping');
        this.set('selectedMapping', null);

        if (picked) {
            this.get('action')(picked);
        } else {
            console.log("PLS PICK SOMETHING");
        }
    }
}
