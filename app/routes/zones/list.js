import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    flashMessages: service(),
    _title: 'zone.list.title',
    _requireAuth: true,

    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.findAll('zone', {reload: true});
    },
    actions: {
        findType(zone) {
            if (zone.type === "Logical") {
                return 1;
            } else {
                return 0;
            }
        },
        deleteZone(zone)
        {
            zone.destroyRecord({}).then(() =>
            {
                this.flashMessages.success('Zone has been deleted.');
                this.router.transitionTo('zones.list');
            });
        }
    }
});
