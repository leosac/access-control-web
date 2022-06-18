import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import {
  findAllCredentials,
  deleteCredential
} from 'web/leosac-credential-helper';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'credentials.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        return findAllCredentials(this.store);
    },
    actions: {
        deleteCredential(credential)
        {
            const self = this;

            deleteCredential(this.store, credential.get('id'), () =>
                {
                    self.flashMessages.success('Credential has been deleted.');
                    self.router.transitionTo('credentials.list');
                    self.refresh();
                }).catch(() =>
                {
                    self.flashMessages.danger('Failed to delete credential');
                    credential.rollbackAttributes();
                });
        }
    }
});
