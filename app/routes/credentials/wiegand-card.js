import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({
    _title: 'Wiegand Card ',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model(params)
    {
        "use strict";
        return this.get('store').find('wiegand-card', params.credential_id);
    }
});
