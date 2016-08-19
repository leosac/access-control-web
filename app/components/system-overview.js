import Ember from 'ember';

export default Ember.Component.extend({
    systemOverview: Ember.inject.service('system-overview'),
    init()
    {
        "use strict";
        this._super();
        this.get('systemOverview').update();
    }
});
