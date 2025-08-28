import { action } from '@ember/object';
import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;
    @service
    router;
    @service
    flashMessages;

    _title = 'group.list.title';
    _requireAuth = true;

    model()
    {
        // Since we'are about to reload all group, clear all before.
        return this.store.findAll('group', {reload: true});
    }

    @action
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
