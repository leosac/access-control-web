import LeosacRoute from 'web/leosac-route';

export default class UsersRoute extends LeosacRoute {
    _title = 'Users';
    _requireAuth = true;

    model()
    {
    }
}
