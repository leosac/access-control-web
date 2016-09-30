import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';
import {findAllCredentials, deleteCredential} from 'web/leosac-credential-helper';

export default LeosacRoute.extend({
    _title: 'Credentials list',
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
        deleteCredential(credentialId)
        {
            const self = this;

            deleteCredential(this.get('store'), credentialId, () =>
                {
                    self.get('flashMessages').success('Credential has been deleted.');
                    self.transitionTo('credentials.list');
                },
                () =>
                {
                    self.get('flashMessages').danger('Failed to delete credential');
                }
            );
        }
    }
});
