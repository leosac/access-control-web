import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class GroupAddOneUser extends Component {
    @service('leosac-info')
    globalInfo;

    @service
    flashMessages;

    @service
    intl;

    @service
    store;

    @service
    search;

    selectedUser = '';
    selectedRank = 'member';
    group = false;

    constructor(owner, args) {
        super(owner, args);
        this.allRank = this.allRank || ['member', 'operator', 'administrator'];
    }

    @action
    addToGroup() {
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
    }

    @action
    searchUser(partialName) {
        return this.search.findUserByUsername(partialName);
    }

    @action
    setUser(user) {
        this.set('selectedUser', user);
    }
}
