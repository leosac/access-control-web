import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class SystemOverviewRoute extends LeosacRoute {
    @service('authentication')
    authSrv;
    @service('system-overview')
    systemOverview;
    @service
    store
    _title = 'system-overview.title';
    _requireAuth = true;

    @action
    refreshOverview()
    {
        "use strict";
        //console.log('sysoverview route refresh');
        this.get('systemOverview').update();
    }
        
    beforeModel()
    {
        "use strict";
        return this._super();
    }
}
