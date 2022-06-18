import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    search: service(),
    availableAccessPointModules: [],

    didReceiveAttrs() {
        "use strict";
        this._super(...arguments);
        this.set('availableAccessPointModules',
            this.search.listAccessPointModuleNames());
    },
});
