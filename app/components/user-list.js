import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

/**
 * Print a table of users.
 */
export default class UserList extends Component {
    @service
    router;

    @action
    gotoItem(id) {
        this.router.transitionTo('profile', id);
    }
}
