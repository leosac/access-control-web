import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
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
        return this.get('store').findAll('group', {reload: true});
    },
    actions:
    {
        deleteGroup(groupId)
        {
            const self = this;
            const model = this.get('store').peekRecord('group', groupId);
            if (model)
            {
                model.destroyRecord({}).then(() =>
                {
                    self.get('flashMessages').success('Group has been deleted.');
                    self.transitionTo('groups.list');
                }).catch(() => model.rollbackAttributes());
            }
        }
    }
});
