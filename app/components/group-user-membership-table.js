import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class GroupUserMembershipTable extends Component {
    @service('authentication')
    authSrv;

    @service
    store;

    @service
    router;

    canRemoveUserFromGroup = false;

    constructor(owner, args) {
        super(owner, args);

        const currentUser = this.authSrv.current_user;
        currentUser.get('memberships').then((memberships) =>
        {
            memberships.forEach((m) =>
            {
                if (m.get('group').get('id') === this.get('group').get('id'))
                {
                    if (m.get('rank') === 'administrator') {
                        this.canRemoveUserFromGroup = true;
                    }
                }
            });
        });
        if (this.authSrv.isAdministrator)
        {
            this.canRemoveUserFromGroup = true;
        }
    }

    @action
    deleteMembership(membershipId) {
        const membership = this.store.peekRecord('user-group-membership', membershipId);
        membership.destroyRecord({});
    }

    @action
    gotoItem(id) {
        this.router.transitionTo('profile', id);
    }
}
