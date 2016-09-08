import LeosacRoute from '../leosac-route';

/**
 * Create a new user.
 * Requires to be an administrator.
 */
export default LeosacRoute.extend({
    _title: 'Create user',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return {};
    }
});
