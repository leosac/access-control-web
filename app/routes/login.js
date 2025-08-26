import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class LoginRoute extends LeosacRoute {
    @service('authentication')
    authSrv;
    @service
    router;
    _title = 'login';

    beforeModel()
    {
        this._super();
        if (this.get('authSrv').isLoggedIn())
        {
            this.router.transitionTo('index');
        }
    }
}
