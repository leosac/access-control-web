import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function ()
{
  this.route('about');
  this.route('login');
  this.route('system-overview');
  this.route('profile', {path: '/profile/:user_id'});
  this.route('error', {path: '/error/:error_content'}, function ()
  {
      this.route('session-aborted');
      this.route('permission-denied');
      this.route('entity-not-found');
      this.route('request-timeout');
  });
  this.route('users');
  this.route('create-user');
});

export default Router;
