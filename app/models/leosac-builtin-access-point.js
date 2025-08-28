import { attr, hasMany } from '@ember-data/model';
import AccessPoint from 'web/models/access-point';

export default class LeosacBuiltinAccessPointModel extends AccessPoint {
    @hasMany('schedule', { async: false, inverse: null })
    alwaysCloseSchedules;
    @hasMany('schedule', { async: false, inverse: null })
    alwaysOpenSchedules;
    @attr('string')
    authenticationBackend;
    @hasMany('device', { async: false, inverse: null })
    authSourcesDevice;
    @hasMany('leosac-builtin-access-point-action', { async: false, inverse: null })
    actionOnSuccess;
    @hasMany('leosac-builtin-access-point-action', { async: false, inverse: null })
    actionOnError;
}
