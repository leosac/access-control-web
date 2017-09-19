import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: Ember.inject.service(),
    _title: 'zone.list.title',
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
        console.log('Acceced the routes/list.js');
        return this.get('store').findAll('piface-digital-gpio', {reload: true});
    },

    actions: {
        deletePifaceDigitalGpio(config)
        {
            const self = this;
            config.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Piface digital GPIO config has been deleted.');
                self.transitionTo('piface-digital-gpios.list');
            });
        }
    }
});
