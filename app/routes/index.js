import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    leosacInfo: Ember.inject.service('leosac-info'),
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
        let pathToEveryImage = this.get('leosacInfo').getPathToEveryImage();
        return new Ember.RSVP.Promise((resolve) => {
            this.get('authSrv').get('current_auth').promise.then((res) => {
                resolve({
                    pathToEveryImage: pathToEveryImage,
                    user_id: this.get('authSrv').user_id,
                    username: this.get('authSrv').username
                });
            });
        });
    }
});
