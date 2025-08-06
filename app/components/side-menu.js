import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class SideMenu extends Component {
    @service('module-manager')
    moduleManager;

    @service
    router;

    init() {
      super.init(...arguments);
    }

    @action
    handleRoute(route) {
        this.router.transitionTo(route);
    }
}
