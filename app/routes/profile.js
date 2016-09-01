import Ember from 'ember';
import LeosacRoute from '../leosac-route';

export default LeosacRoute.extend({
    _title: 'Profile',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('user', params.user_id);
        //const user_id = this.get('authSrv').user_id;
//        return this.get('store').findRecord('user', user_id);


        // Force eager load.
        var p = this.get('store').findRecord('user', params.user_id);
        return p.then((user) =>
        {
            console.log(user);
            return user.get('memberships').then((m) =>
            {
                console.log("membersjips");
                console.log(m);
                var promises = [];
                m.forEach((membership) =>
                {
                    promises.push(membership.get('group'));
                });
                return Ember.RSVP.all(promises).then(() =>
                {
                    return p;
                });
            });
        });
    },
    actions: {
        submit: () =>
        {
        }
    }
});
