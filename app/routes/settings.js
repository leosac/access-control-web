import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class SettingsRoute extends LeosacRoute {
    @service('authentication')
    authSrv;
    @service('leosac-info')
    leosacInfo;
    _title = 'settings';
    _requireAuth = true;

    beforeModel()
    {
        "use strict";
        return this._super();
    }

    model()
    {
        "use strict";
    }
}
