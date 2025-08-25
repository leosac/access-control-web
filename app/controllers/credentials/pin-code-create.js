import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createPin() {
        this.get('model').save().then((pin) => {
                this.flashMessages.success('Pin successfully created.');
                this.router.transitionTo('credentials.pin-code', pin.get('id'));
            },
            () => {
                this.flashMessages.danger('An error occurred while creating the PIN');
            });
    }
}