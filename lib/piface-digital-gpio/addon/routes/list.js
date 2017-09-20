import LeosacRoute from 'web/leosac-route';
import Ember from 'ember';

export default LeosacRoute.extend({
    store: Ember.inject.service(),
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
            return config;
        }
    }
});
