import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import Component from '@ember/component';
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
export default Component.extend(Validations, {
    password: '',
    password2: '',
    _observerPassword: observer('password', 'password2', function ()
    {
        once(this, 'tryUpdatePasswordValue');
    }),
    tryUpdatePasswordValue ()
    {
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
    },
    init()
    {
        this._super(...arguments);
    },
});
