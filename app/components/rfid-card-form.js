import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class RfidCardForm extends Component {
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
    card = false;

    constructor(owner, args) {
        super(owner, args);
        this.selectedUser = this.args.card.get('owner');
    }

    @action
    setOwner(user) {
        this.selectedUser = user;
        this.store.findRecord('user', this.selectedUser.get('id')).then((user) => {
            if (!user) {
                this.flashMessages.danger(this.intl.t('users.error.find_error'));
                return;
            }
            this.args.card.set('owner', user);
        });
    }

    @action
    searchUser(partialName) {
        return this.search.findUserByUsername(partialName);
    }
}
