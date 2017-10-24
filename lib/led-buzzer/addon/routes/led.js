import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'buzzer.title',
    _requireAuth: true,
    store: Ember.inject.service('store'),
    i18n: Ember.inject.service(),

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('led', params.led_id);
    },
    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod)
                mod.rollbackAttributes();
        }
    },
    actions: {
        editLed()
        {
            let led = this.controller.get('model');

            led.save().then(() =>
            {
                this.get('flashMessages').success(this.get('i18n').t('led-buzzer.error.update_success'));
            }, () =>
            {
                this.get('flashMessages').danger(this.get('i18n').t('led-buzzer.error.update_error'));
            });
        },
    }
});
