import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class UserPicker extends Component {
    @service
    store;

    form = null;

    constructor(owner, args) {
        super(owner, args);
        this.allUsers = this.allUsers || [];
        const self = this;
        this.store.findAll('user', {reload: true}).then((users) =>
        {
            if (!(self.get('isDestroyed'))) {
                self.set('allUsers', users);
            }
        });
    }
}
