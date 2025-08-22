import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class GroupList extends Component {
    @service
    router;

    constructor(owner, args) {
        super(owner, args);
    }

    @action
    gotoItem(id) {
        this.router.transitionTo('group', id);
    }
}
