import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    deleteDoor(door) {
        door.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Door has been deleted.');
            this.router.transitionTo('doors.list');
        });
    }
}