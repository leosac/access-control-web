import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'leds.title',
    _requireAuth: true,
    store: service(),
    router: service(),
    intl: service(),
    flashMessages: service(),

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.store.findRecord('led', params.led_id);
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
                this.flashMessages.success(this.intl.t('configurations.error.update_success'));
            }, () =>
            {
                this.flashMessages.danger(this.intl.t('configurations.error.update_error'));
            });
        },
        deleteLedBuzzer()
        {
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                this.flashMessages.success('LED has been deleted.');
                this.router.transitionTo('list');
            });
        }
    }
});
