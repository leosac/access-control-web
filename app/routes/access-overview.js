import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'access-overview.title',
    _requireAuth: true,

    setupController(controller)
    {
        controller.reload();
    }
});
