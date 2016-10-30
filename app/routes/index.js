import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    _title: 'index.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        this._super();
    },
    model()
    {
        "use strict";
        return {user_id: this.get('authSrv').user_id,
            username: this.get('authSrv').username};
    }
});
