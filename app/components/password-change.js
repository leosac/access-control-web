import { action } from '@ember/object';
import { service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import Component from '@glimmer/component';

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

export default class PasswordChange extends Component {
    @service
    intl;

    @service('password-change')
    passwordChange;

    @service
    flashMessages;

    current_password = null;
    new_password = null;
    new_password2 = null;

    @action
    changePassword() {
        this.passwordChange.changePassword(this.args.user_id, this.current_password, this.new_password).then(() =>
        {
            this.flashMessages.success(this.intl.t('password-change.successfully_changed'));
        });
    }
}
