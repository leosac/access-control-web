import Ember from 'ember';
import LeosacRoute from '../leosac-route';

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
        });
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
            this.controller.get('model').user.reload();
        }
    }
});
