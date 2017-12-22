import Ember from 'ember';

export default Ember.Component.extend({
    // `action` and `pin` must be set.
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),
    search: Ember.inject.service(),
    flashMessages: Ember.inject.service(),

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
                    fm.danger(this.get('i18n').t('users.error.find_error'));
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
