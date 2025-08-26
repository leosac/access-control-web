import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class GroupList extends Component {
    @service
    router;

    @action
    gotoItem(id) {
        this.router.transitionTo('group', id);
    }
}
