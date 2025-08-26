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
        let self = this;
        this.errorMessage = '';

        if (this.inputUsername.length === 0 || this.inputPassword.length === 0)
        {
            this.errorMessage = this.intl.t('login-form.username_password_required');
            return;
        }

        this.pending = true;
        this.authSrv.authenticate(this.inputUsername, this.inputPassword,
            function ()
            {
                self.pending = false;
                self.router.transitionTo('index');
            },
            function (status, msg)
            {
                self.pending = false;
                if (msg) {
                    self.errorMessage = 'Auth failure [' + status + ']: ' + msg;
                } else {
                    self.errorMessage = 'Auth failure [' + status + ']';
                }
            });
    }
}
