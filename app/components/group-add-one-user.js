import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    globalInfo: service('leosac-info'),
    flashMessages: service(),
    intl: service(),
    store: service(),
    search: service(),

    selectedUser: '',
    selectedRank: 'member',
    allRank: ['member', 'operator', 'administrator'],
    group: false,

    actions: {
        addToGroup()
        {
            this.store.findRecord('user', this.get('selectedUser.id')).then((user) => {
                if (!user)
                {
                    this.flashMessages.danger(this.intl.t('users.error.find_error'));
                    return;
                }

                const membership = this.store.createRecord('user-group-membership');
                membership.set('group', this.get('group'));
                membership.set('rank', this.get('selectedRank'));
                membership.set('user', user);

                membership.save().then(() =>
                    {
                        this.flashMessages.success(this.intl.t('users.error.add_success'));
                    },
                    () =>
                    {
                        this.flashMessages.danger(this.intl.t('users.error.add_error'));
                        membership.deleteRecord();
                    });
            });
        },
        searchUser(partialName) {
            return this.search.findUserByUsername(partialName);
        },
        setUser(user) {
            this.set('selectedUser', user);
        }
    }
});
