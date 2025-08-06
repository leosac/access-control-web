import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class GroupList extends Component {
    @service
    router;

    init() {
      super.init(...arguments);
    }

    @action
    gotoItem(id) {
        this.router.transitionTo('group', id);
    }
}
