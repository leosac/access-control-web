import LeosacRoute from 'web/leosac-route';

export default class AccessOverviewRoute extends LeosacRoute {
    _title = 'access-overview.title';
    _requireAuth = true;

    setupController(controller)
    {
        controller.reload();
    }
}
