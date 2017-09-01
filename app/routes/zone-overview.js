import Ember from 'ember';
import LeosacRoute from 'web/leosac-route';

export default LeosacRoute.extend({

    // beforeModel()
    // {
    //     "use strict";
    //     return this._super();
    // },
    // model(params) {
    //     "use strict";
    //     console.log(params);
    //     console.log(this.get('store'));
    //     console.log("separator");
    //     console.log(this.get('store').findRecord('zone', params.zone_id));
    //     return this.get('store').findAll('door').then(() => {
    //         console.log("On y est");
    //     });
    // },
    _title: 'zone.tree_view',
    _requireAuth: true,
    model() {
        return this.get('store').findAll('zone');
    }
});
