import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'audit.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
    },
    setupController(controller)
    {
        this._super(...arguments);
        controller.reload();
    }
});
