import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class LoginForm extends Component {
    @service
    intl;

    @service
    router;

    @service('authentication')
    authSrv;

    pending = false;
    inputUsername = '';
    inputPassword = '';
    errorMessage = '';

    @action
    login() {
        this.errorMessage = '';

        if (this.inputUsername.length === 0 || this.inputPassword.length === 0)
        {
            this.errorMessage = this.intl.t('login-form.username_password_required');
            return;
        }

        this.pending = true;
        this.authSrv.authenticate(this.inputUsername, this.inputPassword,
            () =>
            {
                this.pending = false;
                this.router.transitionTo('index');
            },
            (status, msg) =>
            {
                this.pending = false;
                if (msg) {
                    this.errorMessage = 'Auth failure [' + status + ']: ' + msg;
                } else {
                    this.errorMessage = 'Auth failure [' + status + ']';
                }
            });
    }
}
