import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new buzzer config.
 */
export default LeosacRoute.extend({
    _title: 'buzzers.create',
    store: service('store'),
    i18n: service(),
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
        return this.get('store').createRecord('buzzer');
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
        createBuzzer()
        {
            this.modelFor('buzzer-create').save().then((d) =>
                {
                    this.get('flashMessages').success(this.get('i18n').t('configurations.error.create_success'));
                    this.transitionTo('buzzer', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('i18n').t('configurations.error.create_error'));
                });
        }
    }
});
