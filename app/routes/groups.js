import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Groups',
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
});
