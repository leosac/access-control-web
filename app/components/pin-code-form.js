import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    // `action` and `pin` must be set.
    intl: service(),
    store: service(),
    search: service(),
    flashMessages: service(),

    selectedUser: false,
    pin: false,
    init() {
        this._super(...arguments);
        this.set('selectedUser', this.get('pin.owner'));
    },
    actions: {
        setOwner(user) {
            const fm = this.get('flashMessages');
            this.set('selectedUser', user);
            this.get('store').findRecord('user', this.get('selectedUser.id')).then((user) => {
                if (!user) {
                    fm.danger(this.get('intl').t('users.error.find_error'));
                    return;
                }
                this.get('pin').set('owner', user);
            });
        },
        searchUser(partialName) {
            return this.get('search').findUserByUsername(partialName);
        }
    }
});
