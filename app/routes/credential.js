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
        this.controller.model.destroyRecord({}).then(() =>
        {
            this.flashMessages.success('Credential has been deleted.');
            this.router.transitionTo('credentials.list');
        }).catch(() => this.controller.model.rollbackAttributes());
    }
}
