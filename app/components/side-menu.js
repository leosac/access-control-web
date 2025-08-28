import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class SideMenu extends Component {
    @service('module-manager')
    moduleManager;
    @service
    router;

    @action
    handleRoute(route) {
        this.router.transitionTo(route);
    }
}
