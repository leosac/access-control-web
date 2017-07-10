import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'audit.title',
    _requireAuth: true,
    beforeModel()
    {
        console.log("lol1");
        "use strict";
        return this._super();
    },
    model()
    {
        console.log("lol2");
        "use strict";
    },
    setupController(controller, model)
    {
        console.log("lol3");
        this._super(...arguments);
        controller.reload();
    }
});
