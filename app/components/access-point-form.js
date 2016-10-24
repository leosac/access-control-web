import Ember from 'ember';

export default Ember.Component.extend({
    search: Ember.inject.service('search'),
    availableAccessPointModules: [],

    didReceiveAttrs() {
        "use strict";
        this._super(...arguments);
        this.set('availableAccessPointModules',
            this.get('search').listAccessPointModuleNames());
    },
});
