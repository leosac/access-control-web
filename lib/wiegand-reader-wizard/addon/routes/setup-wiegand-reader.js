import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';


export default LeosacRoute.extend({
    _title: 'wiegand-reader-wizard.title',
    _requireAuth: true,
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),

    beforeModel() {
        "use strict";
        return this._super();
    },
    model() {
        "use strict";
        return this.get('store').createRecord('wiegand-reader');
    },
    resetController(controller, isExiting/*, transition*/) {
        const mod = this.controller.get('model');
        if (isExiting && mod.get('isNew')) {
            mod.unloadRecord();
        }
    },
    actions: {
        createWiegandReader()
        {
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
