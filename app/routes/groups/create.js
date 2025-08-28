import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

/**
 * Create a new group.
 */
export default class extends LeosacRoute {
    @service
    store;

    _title = 'group.create.title';
    _requireAuth = true;

    model()
    {
        const newGroup = this.store.createRecord('group');
        newGroup.set('description', '');
        return newGroup;
    }

    resetController(controller, isExiting/*, transition*/)
    {
        const mod = this.controller.model;
        if (isExiting && mod.get('isNew'))
        {
            mod.unloadRecord();
        }
    }
}
