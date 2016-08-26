import Ember from 'ember';
import LeosacRoute from '../leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    _title: 'My Profile',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const user_id = this.get('authSrv').user_id;
        return this.get('store').findRecord('user', user_id);

/*
        // Force eager load.
        var p = this.get('store').findRecord('user', user_id);
        return p.then((user) => {
            return user.get('groups').then(() => {return p;});
        });*/
    },
    actions: {
        submit: () =>
        {
        }
    }
});
