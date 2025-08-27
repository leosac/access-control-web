import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';
import {
  deleteCredential
} from 'web/leosac-credential-helper';

export default class extends Controller {
    @service
    flashMessages;
    @service
    store;
    @service
    router;

    @action
    deleteCredential(credential) {
        deleteCredential(this.store, credential.get('id'), () =>
            {
                this.flashMessages.success('Credential has been deleted.');
                this.router.transitionTo('credentials.list');
                this.router.refresh();
            }).catch(() =>
            {
                this.flashMessages.danger('Failed to delete credential');
                credential.rollbackAttributes();
            });
    }
}