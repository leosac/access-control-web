import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: service('authentication'),
    leosacInfo: service('leosac-info'),
    _title: 'settings',
    _requireAuth: true,

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
    }
});
