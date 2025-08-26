import LeosacRoute from 'web/leosac-route';

export default class UsersRoute extends LeosacRoute {
    _title = 'Users';
    _requireAuth = true;

    beforeModel()
    {
        "use strict";
        return this._super();
    }

    model()
    {
        "use strict";
    }
}
