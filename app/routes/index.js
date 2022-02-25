import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: service('authentication'),
    leosacInfo: service('leosac-info'),
    _title: 'index.title',
    _requireAuth: true,
    init()
    {
        "use strict";
        this._super(...arguments);
    },
    model()
    {
        "use strict";
        return new Promise((resolve) => {
            this.get('authSrv').get('current_auth').promise.then(() => {
                resolve({
                    user_id: this.get('authSrv').user_id,
                    username: this.get('authSrv').username
                });
            });
        });
    }
});
