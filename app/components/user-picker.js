import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class UserPicker extends Component {
    @service
    store;

    init() {
        super.init(...arguments);
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
