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
            const store = this.get('store');
            const fm = this.get('flashMessages');

            this.get('store').findRecord('user', this.get('selectedUser.id')).then((user) => {
                if (!user)
                {
                    fm.danger(this.get('intl').t('users.error.find_error'));
                    return;
                }

                const membership = store.createRecord('user-group-membership');
                membership.set('group', this.get('group'));
                membership.set('rank', this.get('selectedRank'));
                membership.set('user', user);

                membership.save().then(() =>
                    {
                        fm.success(this.get('intl').t('users.error.add_success'));
                    },
                    () =>
                    {
                        fm.danger(this.get('intl').t('users.error.add_error'));
                        membership.deleteRecord();
                    });
            });
        },
        searchUser(partialName) {
            return this.get('search').findUserByUsername(partialName);
        },
        setUser(user) {
            this.set('selectedUser', user);
        }
    }
});
