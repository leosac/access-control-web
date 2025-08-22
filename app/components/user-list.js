import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

/**
 * Print a table of users.
 */
export default class UserList extends Component {
    @service
    router;

    constructor(owner, args) {
        super(owner, args);
    }

    @action
    gotoItem(id) {
        this.router.transitionTo('profile', id);
    }
}
