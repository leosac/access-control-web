import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'door.title',
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
        return this.get('store').findRecord('piface-digital-gpio', params.piface_digital_gpio_id);
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
        editPifaceDigitalGpio ()
        {
            let gpio = this.controller.get('model');
            const fm = this.get('flashMessages');
            const i18n = this.get('i18n');

            gpio.save().then(() =>
            {
                fm.success(i18n.t('profile.profile_updated') + '.');
            }, (why) =>
            {
                fm.danger(i18n.t('profile_fail_update') + ': ' + why.status_string);
            });
        },
    }
});
