import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    search: service('search'),
    availableAccessPointModules: [],

    didReceiveAttrs() {
        "use strict";
        this._super(...arguments);
        this.set('availableAccessPointModules',
            this.get('search').listAccessPointModuleNames());
    },
});
