import LeosacRoute from 'web/leosac-route';

export default class AuditLogRoute extends LeosacRoute {
    _title = 'audit.title';
    _requireAuth = true;

    model()
    {
    }

    setupController(controller)
    {
        this._super(...arguments);
        controller.reload();
    }
}
