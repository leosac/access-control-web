import Ember from 'ember';

export default Ember.Component.extend({
  authSrv: Ember.inject.service('authentication'),
  pending: false,
  inputUsername: '',
  inputPassword: '',
  errorMessage: '',
  onLoginSuccess: 'onLoginSuccess',
  actions: {
    login()
    {
      var self = this;
      this.set('errorMessage', '');
      var username = this.get('inputUsername');
      var password = this.get('inputPassword');

      if (username.length === 0 || password.length === 0)
      {
        this.set('errorMessage', 'Username and password are required.');
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
