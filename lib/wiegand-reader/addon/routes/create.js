import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

/**
 * Create a new piface-digital.gpio config.
 */
export default LeosacRoute.extend({
    _title: 'wiegand-reader.title',
    store: Ember.inject.service('store'),
    i18n: Ember.inject.service(),
    _requireAuth: true,

    init() {
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').createRecord('wiegand-reader');
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
        createWiegandReader()
        {
            const self = this;
            this.modelFor('create').save().then((d) =>
                {
                    this.get('flashMessages').success(this.get('i18n').t('wiegand-reader.error.create_success'));
                    this.transitionTo('wiegand-reader', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('i18n').t('wiegand-reader.error.create_error'));
                });
        }
    }
});
