import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Wiegand Card ',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').find('wiegand-card', params.credential_id);
    },
    actions: {
        updateCard()
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
        deleteCredential()
        {
            this.controller.get('model').destroyRecord().then(() =>
                {
                    this.get('flashMessages').success('Credential has been deleted.');
                    this.transitionTo('credentials.list');
                },
                () =>
                {
                    this.get('flashMessages').danger('Failed to delete credential.')
                });
        }
    }
});
