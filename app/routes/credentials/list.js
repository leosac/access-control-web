import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';
import {findAllCredentials} from 'web/leosac-credential-helper';

export default LeosacRoute.extend({
    _title: 'Credentials list',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        return findAllCredentials(this.get('store'));
    },
    actions:
    {
/*        deleteGroup(groupId)
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
        }*/
    }
});
