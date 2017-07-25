import Ember from 'ember';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
  authSrv: Ember.inject.service('authentication'),
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
        this.set('errorMessage', this.get('i18n').t('login-form.username_password_required'));
        return;
      }

      this.set('pending', true);
      this.get('authSrv').authenticate(username, password,
        function ()
        {
          self.set('pending', false);
          self.sendAction('onLoginSuccess');
        },
        function (status, msg)
        {
          self.set('pending', false);
          if (msg)
            self.set('errorMessage', 'Auth failure [' + status + ']: ' + msg);
          else
            self.set('errorMessage', 'Auth failure [' + status + ']');
        });
    }
  }
});
