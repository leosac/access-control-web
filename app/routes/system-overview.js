import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    authSrv: service('authentication'),
    systemOverview: service('system-overview'),
    store: service(),
    _title: 'system-overview.title',
    _requireAuth: true,

    actions: {
        refreshOverview()
        {
            "use strict";
            //console.log('sysoverview route refresh');
            this.get('systemOverview').update();
        }
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
});
