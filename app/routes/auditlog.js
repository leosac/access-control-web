import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';
import {findAllAudits} from 'web/leosac-audit-helper';


export default LeosacRoute.extend({
    _title: 'Audit Log',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        //return findAllAudits(this.get('store'));
    },
    actions:
    {
        refresh()
        {
            this.refresh();
        }
    }
});
