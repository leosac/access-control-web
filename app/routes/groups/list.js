import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    router: service(),
    flashMessages: service(),
    _title: 'group.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        // Since we'are about to reload all group, clear all before.
        return this.store.findAll('group', {reload: true});
    },
    actions:
    {
        deleteGroup(groupId)
        {
            const model = this.store.peekRecord('group', groupId);
            if (model)
            {
                model.destroyRecord({}).then(() =>
                {
                    this.flashMessages.success('Group has been deleted.');
                    this.router.transitionTo('groups.list');
                }).catch(() => model.rollbackAttributes());
            }
        }
    }
});
