import Ember from 'ember';
import LeosacRoute from '../leosac-route';

export default LeosacRoute.extend({
    authSrv: Ember.inject.service('authentication'),
    systemOverview: Ember.inject.service('system-overview'),
    store: Ember.inject.service(),
    _title: 'System Overview',
    _requireAuth: true,

    actions: {
        refreshOverview()
        {
            "use strict";
            this.get('systemOverview').update();
        },
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
});
