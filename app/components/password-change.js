import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';

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

export default Component.extend(Validations, {
    intl: service(),
    passwordChange: service('password-change'),
    flashMessages: service(),
    // Shall be injected when invoking the component.
    user_id: null,
    current_password: null,
    new_password: null,
    new_password2: null,
    disabled: false,

    actions: {
        changePassword: function ()
        {
            this.get('passwordChange').changePassword(this.get('user_id'),
                this.get('current_password'),
                this.get('new_password')).then(() =>
            {
                this.flashMessages.success(this.intl.t('password-change.successfully_changed'));
            });
        },
    }
});
