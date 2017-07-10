import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    _title: 'index.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        console.log("lol!");
        this._super();
    },
    model()
    {
        "use strict";
        console.log("lol");
        console.log(this.get('authSrv').username);
        return {user_id: this.get('authSrv').user_id,
            username: this.get('authSrv').username};
    }
});
