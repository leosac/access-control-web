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
        return Ember.RSVP.hash({
            user: newUser,
            possibleRanks: UserRank,
        });
    },
    setupController(controller, model)
    {
        this._super(controller, model);
    },
    actions: {
        createUser()
        {
            const u = this.modelFor(this.routeName).user;
            const fm = this.get('flashMessages');
            const {m, validations} = u.validateSync();
            if (validations.get('isValid') && u.get('password') !== false)
            {
                u.save().then(() =>
                    {
                        fm.success('User successfully created.');
                        this.transitionTo('users.list');
                    },
                    () =>
                    {
                        fm.danger('Failed to create user.');
                    });
            }
        }
    }
});
