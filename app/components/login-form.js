import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    intl: service(),
    authSrv: service('authentication'),
    pending: false,
    inputUsername: '',
    inputPassword: '',
    errorMessage: '',
    onLoginSuccess: 'onLoginSuccess',
    actions: {
        login()
        {
            let self = this;
            this.set('errorMessage', '');
            let username = this.get('inputUsername');
            let password = this.get('inputPassword');

            if (username.length === 0 || password.length === 0)
            {
                this.set('errorMessage', this.intl.t('login-form.username_password_required'));
                return;
            }

            this.set('pending', true);
            this.authSrv.authenticate(username, password,
                function ()
                {
                    self.set('pending', false);
                    self.sendAction('onLoginSuccess');
                },
                function (status, msg)
                {
                    self.set('pending', false);
                    if (msg) {
                        self.set('errorMessage', 'Auth failure [' + status + ']: ' + msg);
                    } else {
                        self.set('errorMessage', 'Auth failure [' + status + ']');
                    }
                });
        }
    }
});
