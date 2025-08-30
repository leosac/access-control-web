import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class UserPicker extends Component {
    @service
    store;

    constructor(owner, args) {
        super(owner, args);
        this.allUsers = this.allUsers || [];
        this.store.findAll('user', {reload: true}).then((users) =>
        {
            if (!(this.isDestroyed)) {
                this.allUsers = users;
            }
        });
    }
}
