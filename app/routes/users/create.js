import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';
import {UserRank} from 'web/leosac-constant';

export default LeosacRoute.extend({
    _title: 'New User',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const newUser = this.get('store').createRecord('user');
        newUser.set('rank', 'Normal');
        return {
            user: newUser,
            possibleRanks: UserRank
        };
    },
    actions:
    {
        createUser()
        {
            alert('boap');
        }
    }
});
