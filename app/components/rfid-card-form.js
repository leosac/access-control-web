import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    // `action` and `pin` must be set.
    intl: service(),
    store: service(),
    search: service(),
    flashMessages: service(),

    selectedUser: false,
    card: false,
    init() {
        this._super(...arguments);
        this.set('selectedUser', this.get('card.owner'));
    },
    actions: {
        setOwner(user) {
            this.set('selectedUser', user);
            this.store.findRecord('user', this.get('selectedUser.id')).then((user) => {
                if (!user) {
                    this.flashMessages.danger(this.intl.t('users.error.find_error'));
                    return;
                }
                this.get('card').set('owner', user);
            });
        },
        searchUser(partialName) {
            return this.search.findUserByUsername(partialName);
        }
    }
});
