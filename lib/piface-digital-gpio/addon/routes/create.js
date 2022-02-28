import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new piface-digital.gpio config.
 */
export default LeosacRoute.extend({
    _title: 'piface-digital-gpios.create.title',
    store: service('store'),
    intl: service(),
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
                    this.get('flashMessages').success(this.get('intl').t('configurations.error.create_success'));
                    this.transitionTo('piface-digital-gpio', d.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger(this.get('intl').t('configurations.error.create_error'));
                });
        }
    }
});
