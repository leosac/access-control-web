import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function ()
{
  this.route('index', {path: '/'});
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

  this.route('users', function ()
  {
      this.route('list');
      this.route('create');
  });

  this.route('groups', function ()
  {
      this.route('create');
      this.route('list');
  });

  this.route('group', {path: '/group/:group_id'});
  this.route('credential', {path: '/credential/:credential_id'}, function ()
  {
  });

  this.route('credentials', function ()
  {
      this.route('list');
      this.route('rfid-card', {path: '/rfid-card/:credential_id'});
      this.route('rfid-card-create');
      this.route('pin-code', {path: '/pin-code/:credential_id'});
      this.route('pin-code-create');
  });

  this.route('schedule', {path: '/schedule/:schedule_id'});
  this.route('schedules', function ()
  {
      this.route('create');
      this.route('list');
  });

  this.route('door', {path: '/door/:door_id'});
  this.route('doors', function ()
  {
      this.route('list');
      this.route('create');
  });

  this.route('zone', {path: '/zone/:zone_id'});
  this.route('zones', function ()
  {
      this.route('list');
      this.route('create');
  });

  this.route('auditlog');
  this.route('access-point', {path: '/access-point/:access_point_id'});
  this.route('access-points', function() {
      this.route('list');
      this.route('create');
  });

  this.route('access-overview');
  this.route('zone-overview');
  this.route('updates');
  this.route('settings');
  this.mount('smtp');
  this.mount('piface-digital-gpio');
  this.mount('wiegand-reader');
});

export default Router;
