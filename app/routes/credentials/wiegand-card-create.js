import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'credentials.wiegand_card_create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('wiegand-card');
    },
    resetController(controller, isExiting, transition)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            this.get('store').unloadRecord(mod);
        }
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
