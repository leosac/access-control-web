import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';

// Validation for password change
const Validations = buildValidations({
    current_password: validator('presence',
        {
            isWarning: true,
            presence: true,
            ignoreBlank: false,
            message: "Shouldn't be left blank, unless you are an administrator."
        }),
    new_password: validator('presence', true),
    new_password2: validator('confirmation', {
        on: 'new_password',
        message: 'Does not match the new password.',
    })
});

export default Ember.Component.extend(Validations, {
    i18n: Ember.inject.service(),
    passwordChange: Ember.inject.service('password-change'),
    // Shall be injected when invoking the component.
    user_id: null,
    current_password: null,
    new_password: null,
    new_password2: null,
    disabled: false,

    actions: {
        changePassword: function ()
        {
            const fm = this.get('flashMessages');

            this.get('passwordChange').changePassword(this.get('user_id'),
                this.get('current_password'),
                this.get('new_password')).then(() =>
            {
                fm.success(this.get('i18n').t('password-change.successfully_changed'));
            });
        },
    }
});
