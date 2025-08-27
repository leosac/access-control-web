import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class PinCodeForm extends Component {
    // `action` and `pin` must be set.
    @service
    intl;

    @service
    store;

    @service
    search;

    @service
    flashMessages;

    selectedUser = false;
    pin = false;

    constructor(owner, args) {
        super(owner, args);
        this.selectedUser = this.args.pin.get('owner');
    }

    @action
    setOwner(user) {
        this.selectedUser = user;
        this.store.findRecord('user', this.selectedUser.get('id')).then((user) => {
            if (!user) {
                this.flashMessages.danger(this.intl.t('users.error.find_error'));
                return;
            }
            this.args.pin.set('owner', user);
        });
    }

    @action
    searchUser(partialName) {
        return this.search.findUserByUsername(partialName);
    }
}
