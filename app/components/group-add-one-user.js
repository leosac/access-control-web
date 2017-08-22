import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
    globalInfo: Ember.inject.service('leosac-info'),
    flashMessages: Ember.inject.service(),
    store: Ember.inject.service(),

    usernameToObject: {},
    allUsernames: [],
    selectedUsername: false,
    selectedRank: 'member',
    allRank: ['member', 'operator', 'administrator'],
    group: false,

    didReceiveAttrs()
    {
        const self = this;

        const usernameToObject = {};
        const usernames = [];
        this.get('store').findAll('user', {reload: true}).then((users) =>
        {
            users.forEach((user) =>
            {
                usernames.push(user.get('username'));
                usernameToObject[user.get('username')] = user;
            });
            console.log("test " + usernames[0]);
            self.set('allUsernames', usernames);
            self.set('usernameToObject', usernameToObject);
        });
    },
    actions: {
        addToGroup()
        {
            const store = this.get('store');
            const fm = this.get('flashMessages');

            const user = this.get('usernameToObject')[this.get('selectedUsername')];
            if (!user)
            {
                fm.danger('Cannot find this user.');
                return;
            }

            const membership = store.createRecord('user-group-membership');
            membership.set('group', this.get('group'));
            membership.set('rank', this.get('selectedRank'));
            membership.set('user', user);

            membership.save().then(() =>
                {
                    fm.success('Successfully added user to group.');
                },
                () =>
                {
                    fm.danger('Failed to add user to group');
                    membership.deleteRecord();
                });
        }
    }
});
