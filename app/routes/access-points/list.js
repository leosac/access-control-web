import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';
import {findAllAccessPoints} from 'web/leosac-access-point-helper';

export default LeosacRoute.extend({
    _title: 'access-point.list.title',
    _requireAuth: true,
    beforeModel()
    {
        "use strict";
        return this._super();
    },
    model()
    {
        "use strict";
        return findAllAccessPoints(this.get('store'));
    },
    actions: {
        deleteAP(ap)
        {
            const self = this;
            ap.destroyRecord({}).then(() =>
            {
                self.get('flashMessages').success('Access Point has been deleted.');
                self.refresh();
                self.transitionTo('access-point.list');
            });
        }
    }
});
