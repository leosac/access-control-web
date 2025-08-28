import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class ScheduleRoute extends LeosacRoute {
    @service
    router;
    @service
    store;
    @service('flash-messages')
    flashMessage;
    _title = 'schedule.title';
    _requireAuth = true;

    model(params)
    {
        return this.store.findRecord('schedule', params.schedule_id);
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
