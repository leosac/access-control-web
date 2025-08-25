import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new buzzer config.
 */
export default LeosacRoute.extend({
    _title: 'buzzers.create',
    store: service(),
    router: service(),
    intl: service(),
    flashMessages: service(),
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
        return this.store.createRecord('buzzer');
    },
    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.get('model');
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    }
});
