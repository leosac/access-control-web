import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Credential',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('credential', params.credential_id);
    },
    actions: {
        editGroup ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.get('flashMessages').success('Credential successfully edited.');
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while editing credential');
                });
        },
        deleteCredential ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Credential has been deleted.');
                self.transitionTo('credentials.list');
            });
        },
    }
});
