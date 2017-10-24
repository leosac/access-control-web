import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

/**
 * Create a new led config.
 */
export default LeosacRoute.extend({
    _title: 'led.create',
    store: Ember.inject.service('store'),
    i18n: Ember.inject.service(),
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
        return this.get('store').createRecord('led');
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
        createLed()
        {
            this.modelFor('led-create').save().then((d) =>
                {
                    this.get('flashMessages').success(this.get('i18n').t('led-buzzer.error.create_success'));
                    this.transitionTo('led', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('i18n').t('led-buzzer.error.create_error'));
                });
        }
    }
});
