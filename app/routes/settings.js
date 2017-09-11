import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    leosacInfo: Ember.inject.service('leosac-info'),
    _title: 'settings'
});