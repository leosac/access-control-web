import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Create Wiegand Card ',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const card = this.get('store').createRecord('wiegand-card');
        return card;
    },
    actions:
    {
        createCard()
        {
            this.controller.get('model').save().then((card) =>
                {
                    this.get('flashMessages').success('Card successfully created.');
                    this.transitionTo('credentials.wiegand-card', card.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while creating the card');
                });
        }
    }
});
