import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class SystemOverview extends Component {
    @service('system-overview')
    systemOverview;

    @service('module-manager')
    moduleManager;

    constructor(owner, args) {
        super(owner, args);
        this.moduleManager.init();
        this.systemOverview.update().catch((failure) =>
        {
            this.sendAction('myError', failure);
        });
    }
}
