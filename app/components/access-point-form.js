import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class AccessPointForm extends Component {
    @service
    search;

    constructor(owner, args) {
        super(owner, args);
        this.availableAccessPointModules = this.availableAccessPointModules || [];
    }

    didReceiveAttrs() {
        "use strict";
        super.didReceiveAttrs(...arguments);
        this.set('availableAccessPointModules',
            this.search.listAccessPointModuleNames());
    }
}
