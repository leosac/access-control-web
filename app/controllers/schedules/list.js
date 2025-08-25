import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;
    @service
    store;

    @action
    deleteSchedule(scheduleId) {
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