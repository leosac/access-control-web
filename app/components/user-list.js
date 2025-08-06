import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

/**
 * Print a table of users.
 */
@classic
export default class UserList extends Component {
    @service
    router;

    init() {
      super.init(...arguments);
    }

    @action
    gotoItem(id) {
        this.router.transitionTo('profile', id);
    }
}
