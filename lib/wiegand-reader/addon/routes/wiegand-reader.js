import { inject as service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'wiegand-reader.title',
    _requireAuth: true,
    store: service(),

    beforeModel() {
        "use strict";
        return this._super();
    },
    model(params) {
        "use strict";
        return this.store.findRecord('wiegand-reader', params.wiegand_reader_id);
    },
    resetController(controller, isExiting/*, transition*/) {
        // Rollback change when leaving the page.
        if (isExiting) {
            const mod = this.controller.get('model');
            if (mod)
                mod.rollbackAttributes();
        }
    }
});
