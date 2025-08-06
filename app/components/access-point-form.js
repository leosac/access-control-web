import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class AccessPointForm extends Component {
    @service
    search;

    init() {
        super.init(...arguments);
        this.availableAccessPointModules = this.availableAccessPointModules || [];
    }

    didReceiveAttrs() {
        "use strict";
        super.didReceiveAttrs(...arguments);
        this.set('availableAccessPointModules',
            this.search.listAccessPointModuleNames());
    }
}
