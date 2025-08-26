import { attr, hasMany } from '@ember-data/model';
import AccessPoint from 'web/models/access-point';

export default class LeosacBuiltinAccessPointModel extends AccessPoint {
    @hasMany('schedule', { async: true, inverse: null })
    alwaysCloseSchedules;
    @hasMany('schedule', { async: true, inverse: null })
    alwaysOpenSchedules;
    @attr('string')
    authenticationBackend;
    @hasMany('device', { async: true, inverse: null })
    authSourcesDevice;
    @hasMany('leosac-builtin-access-point-action', { async: true, inverse: null })
    actionOnSuccess;
    @hasMany('leosac-builtin-access-point-action', { async: true, inverse: null })
    actionOnError;
}
