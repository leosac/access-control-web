import { observes } from '@ember-decorators/object';
import { once } from '@ember/runloop';
import Component from '@glimmer/component';
import { validator, buildValidations } from 'ember-cp-validations';

// Validation for password change
const Validations = buildValidations({
    password: validator('presence', true),
    password2: validator('confirmation', {
        on: 'password',
        message: 'Passwords don\'t match.',
    })
});


/**
 * Attributes: passwordOut
 *             optional (do we allow empty pw)
 */
export default class PasswordInput extends Component {
    password = '';
    password2 = '';

    @observes('password', 'password2')
    _observerPassword() {
        once(this, 'tryUpdatePasswordValue');
    }

    tryUpdatePasswordValue() {
        if (this.attrs.optional) {
            this.attrs.passwordOut.update(this.get('password'));
        } else {
            const {validations} = this.validateSync();
            if (validations.get('isValid')) {
                this.attrs.passwordOut.update(this.get('password'));
            } else {
                this.attrs.passwordOut.update(false);
            }
        }
    }

    constructor(owner, args) {
        super(owner, args);
    }
}
