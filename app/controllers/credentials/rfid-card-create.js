import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    createCard() {
        this.get('model').save().then((card) =>
            {
                this.flashMessages.success('Card successfully created.');
                this.router.transitionTo('credentials.rfid-card', card.get('id'));
            },
            () =>
            {
                this.flashMessages.danger('An error occurred while creating the card');
            });
    }
}