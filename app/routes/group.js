import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class GroupRoute extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service
    flashMessages;
    _title = 'group.title';
    _requireAuth = true;

    model(params)
    {
        return this.store.findRecord('group', params.group_id);
    }

    resetController(controller, isExiting/*, transition*/)
    {
        // Rollback change when leaving the page.
        if (isExiting)
        {
            const mod = this.controller.get('model');
            if (mod) {
                mod.rollbackAttributes();
            }
        }
    }
}
