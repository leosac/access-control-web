import LeosacRoute from 'web/leosac-route';

export default class AuditLogRoute extends LeosacRoute {
    _title = 'audit.title';
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

    setupController(controller)
    {
        this._super(...arguments);
        controller.reload();
    }
}
