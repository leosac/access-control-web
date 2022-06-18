import { inject as service } from '@ember/service';
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
    },
    actions: {
        deleteAP(ap)
        {
            ap.destroyRecord({}).then(() =>
            {
                this.flashMessages.success('Access Point has been deleted.');
                this.refresh();
                this.router.transitionTo('access-point.list');
            });
        }
    }
});
