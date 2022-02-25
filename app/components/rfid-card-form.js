import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    // `action` and `pin` must be set.
    i18n: service(),
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
            const fm = this.get('flashMessages');
            this.set('selectedUser', user);
            this.get('store').findRecord('user', this.get('selectedUser.id')).then((user) => {
                if (!user) {
                    fm.danger(this.get('i18n').t('users.error.find_error'));
                    return;
                }
                this.get('card').set('owner', user);
            });
        },
        searchUser(partialName) {
            return this.get('search').findUserByUsername(partialName);
        }
    }
});
