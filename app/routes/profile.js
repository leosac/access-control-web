import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';
import UserRank from 'web/leosac-constant';

export default LeosacRoute.extend({
    passwordChange: Ember.inject.service('password-change'),
    _title: 'Profile',
    _requireAuth: true,
    passwordInfo: null,

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return Ember.RSVP.hash({
            user: this.get('store').findRecord('user', params.user_id),
            possibleRanks: UserRank,
            currentUser: this.get('store').findRecord('user', this.get('authSrv').user_id),
        });
    },
    setupController(controller, model)
    {
        this._super(controller, model);
        controller.set('targetUserId', this.paramsFor('profile').user_id);
    },
    resetController(controller, isExiting, transition)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const user = this.controller.get('model').user;
            if (user)
                user.rollbackAttributes();
        }
    },
    actions: {
        editProfile: function ()
        {
            var user = this.controller.get('model').user;
            var fm = this.get('flashMessages');
            user.save().then(() =>
            {
                fm.success('Profile updated !');
            }, (why) =>
            {
                fm.danger('Failed to update profile: ' + why.status_string);
            });
        },
        refreshLama: function ()
        {
            this.controller.get('model').user.rollbackAttributes();
            this.controller.get('model').user.reload();
        }
    }
});
