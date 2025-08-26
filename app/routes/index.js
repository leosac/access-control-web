import { Promise } from 'rsvp';
import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class IndexRoute extends LeosacRoute {
    @service('authentication')
    authSrv;
    @service('leosac-info')
    leosacInfo;

    _title = 'index.title';
    _requireAuth = true;

    model() {
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
}
