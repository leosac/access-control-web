import { service } from '@ember/service';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    store: service(),
    _title: 'model-name.list.title',
    _requireAuth: true,

    init() {
        this._super(...arguments);
    },
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return this.store.findAll('model-name', {reload: true});
    }
});
