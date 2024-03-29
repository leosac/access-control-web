import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new group.
 */
export default LeosacRoute.extend({
    router: service(),
    store: service(),
    flashMessages: service(),
    _title: 'group.create.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        const newGroup = this.store.createRecord('group');
        newGroup.set('description', '');
        return newGroup;
    },
    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.get('model');
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    },
    actions: {
        createGroup()
        {
            this.modelFor('groups.create').save().then((g) =>
                {
                    this.flashMessages.success('Group created.');
                    this.router.transitionTo('group', g.get('id'));
                },
                () =>
                {
                    this.flashMessages.danger('Failed to create group.');
                });
        }
    }
});
