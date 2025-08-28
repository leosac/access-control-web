import { action } from '@ember/object';
import Component from '@glimmer/component';

/**
 * Attributes: passwordOut
 *             optional (do we allow empty pw)
 */
export default class PasswordInput extends Component {
    password = '';
    password2 = '';

    @action
    tryUpdatePasswordValue() {
        if (this.password === this.password2)
        {
            if (this.password || this.args.optional)
            {
                this.args.passwordOut(this.password);
            }
        }
        else
        {
            this.flashMessages.warning('Passwords don\'t match.');
        }
    }

    constructor(owner, args) {
        super(owner, args);
    }
}
