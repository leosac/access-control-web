import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
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

    init() {
        super.init(...arguments);
        this.set('selectedUser', this.get('card.owner'));
    }

    @action
    setOwner(user) {
        this.set('selectedUser', user);
        this.store.findRecord('user', this.get('selectedUser.id')).then((user) => {
            if (!user) {
                this.flashMessages.danger(this.intl.t('users.error.find_error'));
                return;
            }
            this.get('card').set('owner', user);
        });
    }

    @action
    searchUser(partialName) {
        return this.search.findUserByUsername(partialName);
    }
}
