import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
import { v4 } from 'ember-uuid';

/**
 * Create a new door.
 */
export default LeosacRoute.extend({
    router: service(),
    store: service(),
    _title: 'access-point.create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        // const ap = this.store.createRecord('access-point');
        //
        // // This is kind of a hack to set the LEOSAC-BUILTIN-ACCESS-POINT as default.
        // ap.set('id', v4());
        // ap.set('controllerModule', 'LEOSAC-BUILTIN-ACCESS-POINT');
        // return ap;
    },
    // resetController(controller, isExiting)
    // {
    //     if (isExiting)
    //     {
    //         const mod = this.controller.get('model');
    //         if (mod)
    //             mod.unloadRecord();
    //     }
    // },
});
