import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Group list',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.get('store').findAll('group');
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
                });
            }
        }
    }
});
