import LeosacRoute from 'web/leosac-route';
import Group from 'web/models/group';

/**
 * Create a new group.
 */
export default LeosacRoute.extend({
    _title: 'Create group',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const newGroup = this.get('store').createRecord('group');
        newGroup.set('description', '');
        return newGroup;
    },
    resetController(controller, isExiting, transition)
    {
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod)
                mod.unloadRecord();
        }
    },
    actions: {
        createGroup()
        {
            this.modelFor('groups.create').save().then((g) =>
                {
                    this.get('flashMessages').success('Group created.');
                    this.transitionTo('group', g.get('id'));
                },
                () =>
                {
                    this.get('flashMessages').danger('Failed to create group.');
                });
        }
    }
});
