import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default class extends LeosacRoute {
    @service
    store;

    _title = 'wiegand-reader.title';
    _requireAuth = true;

    model(params) {
        return this.store.findRecord('wiegand-reader', params.wiegand_reader_id);
    }

    resetController(controller, isExiting/*, transition*/) {
        // Rollback change when leaving the page.
        if (isExiting) {
            const mod = this.controller.model;
            if (mod)
                mod.rollbackAttributes();
        }
    }
}
