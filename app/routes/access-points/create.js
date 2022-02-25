import LeosacRoute from 'web/leosac-route';
import { v4 } from 'ember-uuid';

/**
 * Create a new door.
 */
export default LeosacRoute.extend({
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
        // const ap = this.get('store').createRecord('access-point');
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
    actions: {
        createAP()
        {
            const ap = this.get('store').createRecord('leosac-builtin-access-point', {
                id: v4(),
                controllerModule: 'LEOSAC-BUILTIN-ACCESS-POINT',
                alias: 'AP-name'
            });

            this.transitionTo('leosac-builtin-access-point', ap.get('id'));
            // this.modelFor('access-points.create').save().then((ap) =>
            //     {
            //         this.get('flashMessages').success('Access Point created.');
            //
            //         // We create an object of type access point in the browser's memory.
            //         // However, server-side the object will have a concrete subtype.
            //         // So we just unload this temporary object, and we will get a fresh copy
            //         // with the correct underlying type when et reach the /access-point page.
            //         const id = ap.get('id');
            //         ap.unloadRecord();
            //         this.transitionTo('access-point', ap.get('id'));
            //     },
            //     () =>
            //     {
            //         this.get('flashMessages').danger('Failed to create Access Point.');
            //     });
        }
    }
});
