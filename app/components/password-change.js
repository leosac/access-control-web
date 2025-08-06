import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import Component from '@ember/component';

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

@classic
export default class PasswordChange extends Component.extend(Validations) {
    @service
    intl;

    @service('password-change')
    passwordChange;

    @service
    flashMessages;

    disabled = false;
    // Shall be injected when invoking the component.
    user_id = null;
    current_password = null;
    new_password = null;
    new_password2 = null;

    init() {
        super.init(...arguments);
    }

    @action
    changePassword() {
        this.get('passwordChange').changePassword(this.get('user_id'),
            this.get('current_password'),
            this.get('new_password')).then(() =>
        {
            this.flashMessages.success(this.intl.t('password-change.successfully_changed'));
        });
    }
}
