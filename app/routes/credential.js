import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'credential.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('credential', params.id);
    },
    actions: {
        deleteCredential ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Credential has been deleted.');
                self.transitionTo('credentials.list');
            }).catch(() => model.rollbackAttributes());
        },
    }
});
