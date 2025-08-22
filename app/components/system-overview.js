import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class SystemOverview extends Component {
    @service('system-overview')
    systemOverview;

    @service('module-manager')
    moduleManager;

    onSessionLost = 'onSessionLost';
    myError = 'myError';

    constructor(owner, args) {
        "use strict";
        super(owner, args);
        const self = this;
        this.get('moduleManager').init();
        this.get('systemOverview').update().catch((failure) =>
        {
            self.sendAction('myError', failure);
        });
    }
}
