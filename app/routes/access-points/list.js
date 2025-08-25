import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';
// import { findAllAccessPoints } from 'web/leosac-access-point-helper';

export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'access-point.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
//        return findAllAccessPoints(this.store);
        return this.store.peekAll('access-point');
    }
});
