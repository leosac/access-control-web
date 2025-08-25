import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createSchedule() {
        this.get('model').save().then(() =>
        {
            this.flashMessages.success('Schedule created !');
            this.router.transitionTo('schedule', this.get('model').get('id'));
        });
    }
}