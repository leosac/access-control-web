import { attr, hasMany } from '@ember-data/model';
import AccessPoint from 'web/models/access-point';

export default class LeosacBuiltinAccessPointModel extends AccessPoint {
    @hasMany('schedule')
    alwaysCloseSchedules;
    @hasMany('schedule')
    alwaysOpenSchedules;
    @attr('string')
    authenticationBackend;
    @hasMany('device')
    authSourcesDevice;
    @hasMany('leosac-builtin-access-point-action')
    actionOnSuccess;
    @hasMany('leosac-builtin-access-point-action')
    actionOnError;
}
