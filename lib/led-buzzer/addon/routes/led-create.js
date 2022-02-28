import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new led config.
 */
export default LeosacRoute.extend({
    _title: 'leds.create',
    store: service('store'),
    intl: service(),
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
                    this.get('flashMessages').success(this.get('intl').t('configurations.error.create_success'));
                    this.transitionTo('led', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('intl').t('configurations.error.create_error'));
                });
        }
    }
});
