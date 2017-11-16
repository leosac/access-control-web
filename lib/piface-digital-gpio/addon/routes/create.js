import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

/**
 * Create a new piface-digital.gpio config.
 */
export default LeosacRoute.extend({
    _title: 'piface-digital-gpio.create.title',
    store: Ember.inject.service('store'),
    i18n: Ember.inject.service(),
    _requireAuth: true,
    selected: '',
    allDirection: ['in', 'out'],

    init() {
        this.set('selected', 'in');
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('piface-digital-gpio');
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
        createPifaceDigitalGpio()
        {
            this.modelFor('create').save().then((d) =>
                {
                    this.get('flashMessages').success(this.get('i18n').t('configurations.error.create_success'));
                    this.transitionTo('piface-digital-gpio', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('i18n').t('configurations.error.create_error'));
                });
        }
    }
});
