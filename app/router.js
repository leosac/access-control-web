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
  this.route('users', function() {
    this.route('list');
    this.route('create');
  });
  this.route('groups', function() {
    this.route('create');
    this.route('list');
  });
  this.route('group', {path: '/group/:group_id'});
  this.route('credential', {path: '/credential/:credential_id'}, function() {});

  this.route('credentials', function() {
    this.route('list');
    this.route('wiegand-card', {path: '/wiegand-card/:credential_id'});
    this.route('wiegand-card-create');
  });
});

export default Router;
