import DS from 'ember-data';
import AccessPoint from 'web/models/access-point';

export default AccessPoint.extend({
    alwaysCloseSchedules: DS.hasMany('schedule'),
    alwaysOpenSchedules: DS.hasMany('schedule'),
    authenticationBackend: DS.attr('string'),
    authSourcesDevice: DS.hasMany('device'),
    actionOnSuccess: DS.hasMany('leosac-builtin-access-point-action'),
    actionOnError: DS.hasMany('leosac-builtin-access-point-action'),
});
