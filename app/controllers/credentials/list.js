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
    router;

    @action
    deleteCredential(credential) {
        const self = this;
        deleteCredential(this.store, credential.get('id'), () =>
            {
                self.flashMessages.success('Credential has been deleted.');
                self.router.transitionTo('credentials.list');
                self.router.refresh();
            }).catch(() =>
            {
                self.flashMessages.danger('Failed to delete credential');
                credential.rollbackAttributes();
            });
    }
}