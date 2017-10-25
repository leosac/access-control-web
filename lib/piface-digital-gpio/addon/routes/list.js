import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: Ember.inject.service(),
    i18n: Ember.inject.service(),
    _title: 'piface-digital-gpio.list.title',
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
        return this.get('store').findAll('piface-digital-gpio', {reload: true});
    },

    actions: {
        deletePifaceDigitalGpio(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
                {
                    this.get('flashMessages').success(this.get('i18n').t('piface-digital-gpio.error.remove_success'));
                    self.transitionTo('list');
                },
                () => {
                    this.get('flashMessages').danger(this.get('i18n').t('piface-digital-gpio.error.remove_error'));
                });
        },
        enablePiface(piface)
        {
            let newStatue = piface.get('enabled') !== true;
            piface.set('enabled', newStatue);
            piface.save();
        },
    }
});
