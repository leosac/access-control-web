import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class SystemOverview extends Component {
    @service('system-overview')
    systemOverview;

    @service('module-manager')
    moduleManager;

    onSessionLost = 'onSessionLost';
    myError = 'myError';

    init() {
        "use strict";
        super.init();
        const self = this;
        this.get('moduleManager').init();
        this.get('systemOverview').update().catch((failure) =>
        {
            self.sendAction('myError', failure);
        });
    }
}
