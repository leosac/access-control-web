import LeosacRoute from 'web/leosac-route';
import {
  findAllCredentials,
  deleteCredential
} from 'web/leosac-credential-helper';

export default LeosacRoute.extend({
    _title: 'credentials.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        return findAllCredentials(this.get('store'));
    },
    actions: {
        deleteCredential(credential)
        {
            const self = this;

            deleteCredential(this.get('store'), credential.get('id'), () =>
                {
                    self.get('flashMessages').success('Credential has been deleted.');
                    self.transitionTo('credentials.list');
                    self.refresh();
                }).catch(() =>
                {
                    self.get('flashMessages').danger('Failed to delete credential');
                    credential.rollbackAttributes();
                });
        }
    }
});
