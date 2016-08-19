import Ember from 'ember';
import LeosacRoute from '../leosac-route';

export default LeosacRoute.extend({
  authSrv: Ember.inject.service('authentication'),
  _title: 'Login',
  actions: {
    onLoginSuccess: function ()
    {
      this.transitionTo('index');
    }
  },
  beforeModel()
  {
    this._super();
    this.get('authSrv');
  }
});
