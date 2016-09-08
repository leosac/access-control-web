import Ember from 'ember';
import LeosacRoute from '../leosac-route';
import {validator, buildValidations} from 'ember-cp-validations';

// Validation for password change
const Validations = buildValidations({
    current_password: validator('length',
        {
            isWarning: true,
            //presence: true,
            min: 6,
            ignoreBlank: false,
            message: "Shouldn't be left blank, unless you are an administrator."
        }),
    new_password: validator('presence', true),
    new_password2: validator('confirmation', {
        on: 'new_password',
        message: 'Does not match the new password',
    })
});

// Ember Object for password change
const passwordInfoTemplate = Ember.Object.extend(Validations, {
    current_password: null,
    new_password: null,
    new_password2: null,
});

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
        this.set('passwordInfo', passwordInfoTemplate.create(
            Ember.getOwner(this).ownerInjection(), {}));

        return Ember.RSVP.hash({
            user: this.get('store').findRecord('user', params.user_id),
            passwordInfo: this.get('passwordInfo')
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
        changePassword: function ()
        {
            const passwordInfo = this.controller.get('model').passwordInfo;
            const fm = this.get('flashMessages');
            const uid = this.paramsFor('profile').user_id;

            const self = this;
            this.get('passwordChange').changePassword(uid,
                passwordInfo.current_password,
                passwordInfo.new_password).then(() =>
            {
                fm.success('Password successfully changed.');
                //self.controller.transitionToRoute('profile', uid + 1);
                Ember.run.later(() =>
                {
                    self.refresh();
                }, 3000);
                //self.transitionTo('profile', uid);
                //self.controller.set('model.passwordInfo', passwordInfoTemplate.create(
                //Ember.getOwner(this).ownerInjection(),{}));
            });
        },
        refreshLama: function ()
        {
            this.controller.get('model').reload();
        }
    }
});
