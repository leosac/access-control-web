import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: service('authentication'),
    router: service(),
    _title: 'login',
    actions: {
        onLoginSuccess: function ()
        {
            this.router.transitionTo('index');
        }
    },
    beforeModel()
    {
        this._super();
        if (this.get('authSrv').isLoggedIn())
        {
            this.router.transitionTo('index');
        }
    }
});
