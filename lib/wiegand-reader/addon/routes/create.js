import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new piface-digital.gpio config.
 */
export default LeosacRoute.extend({
    _title: 'wiegand-reader.title',
    store: service('store'),
    intl: service(),
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
            this.modelFor('create').save().then((d) =>
                {
                    this.get('flashMessages').success(this.get('intl').t('configurations.error.create_success'));
                    this.transitionTo('wiegand-reader', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('intl').t('configurations.error.create_error'));
                });
        }
    }
});
