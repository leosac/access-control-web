import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class SideMenu extends Component {
    @service('module-manager')
    moduleManager;

    @service
    router;

    constructor(owner, args) {
        super(owner, args);
    }

    @action
    handleRoute(route) {
        this.router.transitionTo(route);
    }
}
