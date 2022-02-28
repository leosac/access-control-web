import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

/**
 * Create a new record of the model.
 */
export default LeosacRoute.extend({
    _title: 'model-name.create',
    store: Ember.inject.service('store'),
    intl: Ember.inject.service(),
    _requireAuth: true,

    init() {
        return this._super();
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('model-name');
    },
    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.get('model');
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    },
    actions: {
        createModelName()
        {
            this.controller.get('model').save().then((d) =>
                {
                    // you can put a flash message indicating that the model was correctly saved
                    this.transitionTo('model-name', d.get('id'));
                },
                () =>
                {
                    // not saved correctly
                });
        }
    }
});
