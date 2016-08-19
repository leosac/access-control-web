import Ember from 'ember';

export default Ember.Component.extend({
  globalInfo: Ember.inject.service('leosac-info'),
  authSrv: Ember.inject.service('authentication')
});
