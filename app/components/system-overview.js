import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    systemOverview: service('system-overview'),
    moduleManager: service('module-manager'),
    onSessionLost: 'onSessionLost',
    myError: 'myError',

    init()
    {
        "use strict";
        this._super();
        const self = this;
        this.get('moduleManager').init();
        this.get('systemOverview').update().catch((failure) =>
        {
            self.sendAction('myError', failure);
        });
    }
});
