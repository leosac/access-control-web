import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class extends Controller {
    @service
    flashMessages;
    @service
    router;

    @action
    updatePin() {
        this.get('model').save().then(() =>
            {
                this.flashMessages.success('Credential successfully edited.');
            },
            () =>
            {
                this.flashMessages.danger('An error occurred while editing credential');
            });
    }

    @action
    deleteCredential() {
        this.get('model').destroyRecord().then(() =>
            {
                this.flashMessages.success('Credential has been deleted.');
                this.router.transitionTo('credentials.list');
            },
            () =>
            {
                this.flashMessages.danger('Failed to delete credential.');
            });
    }
}