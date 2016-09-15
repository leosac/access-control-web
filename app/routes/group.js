import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Group',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').findRecord('group', params.group_id);
    },
    actions: {
        editGroup ()
        {
            this.controller.get('model').save().then(() =>
                {
                    this.get('flashMessages').success('Group successfully edited.');
                },
                () =>
                {
                    this.get('flashMessages').danger('An error occurred while editing group');
                });
        },
        deleteGroup ()
        {
            const self = this;
            const model = this.controller.get('model');
            model.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Group has been deleted.');
                self.transitionTo('groups.list');
            });
        },
        cancelAndRefresh: function ()
        {
            this.controller.get('model').rollbackAttributes();
            this.controller.get('model').reload();
        }
    }
});
