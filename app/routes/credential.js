import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class CredentialRoute extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service
    flashMessages;
    _title = 'credential.title';
    _requireAuth = true;

    beforeModel()
    {
        "use strict";
        return this._super();
    }

    model(params)
    {
        "use strict";
        return this.store.findRecord('credential', params.id);
    }

    @action
    deleteCredential ()
    {
        const self = this;
        const model = this.controller.get('model');
        model.destroyRecord({}).then(() =>
        {
            self.flashMessages.success('Credential has been deleted.');
            self.router.transitionTo('credentials.list');
        }).catch(() => model.rollbackAttributes());
    }
}
