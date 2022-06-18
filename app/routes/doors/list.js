import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    flashMessages: service(),
    _title: 'door.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.findAll('door', {reload: true});
    },
    actions: {
        deleteDoor(door)
        {
            door.destroyRecord({}).then(() =>
            {
                this.flashMessages.success('Door has been deleted.');
                this.router.transitionTo('doors.list');
            });
        }
    }
});
