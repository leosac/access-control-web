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
        let promise = new Ember.RSVP.Promise((resolve) =>
        {
            this.get('authSrv').get('current_auth').promise.then((res) =>
            {
                resolve({user_id: this.get('authSrv').user_id,
                    username: this.get('authSrv').username});
            });
        });
        return promise;
    }
});
