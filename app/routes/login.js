import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    _title: 'login',
    actions: {
        onLoginSuccess: function ()
        {
            this.transitionTo('index');
        }
    },
    beforeModel()
    {
        this._super();
        if (this.get('authSrv').isLoggedIn())
        {
            this.transitionTo('index');
        }
    }
});
