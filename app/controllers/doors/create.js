import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createDoor() {
        this.model.save().then((d) =>
            {
                this.flashMessages.success('Door created.');
                this.router.transitionTo('door', d.get('id'));
            },
            () =>
            {
                this.flashMessages.danger('Failed to create door.');
            });
    }
}