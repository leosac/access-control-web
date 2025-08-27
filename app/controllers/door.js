import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    editDoor() {
        this.model.save().then(() =>
            {
                this.flashMessages.success('Door successfully edited.');
                this.router.transitionTo('door', this.get('model').get('id'));
            },
            () =>
            {
                this.flashMessages.danger('An error occurred while editing door');
            });
    }

    @action
    deleteDoor(){
        const self = this;
        this.model.destroyRecord({}).then(() =>
        {
            self.flashMessages.success('Door has been deleted.');
            self.router.transitionTo('doors.list');
        });
    }
}