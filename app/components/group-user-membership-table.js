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

    group = false;
    canRemoveUserFromGroup = false;

    didReceiveAttrs() {
        super.didReceiveAttrs(...arguments);
        const self = this;

        const currentUser = this.authSrv.get('current_user');
        currentUser.get('memberships').then((memberships) =>
        {
            memberships.forEach((m) =>
            {
                if (m.get('group').get('id') === self.get('group').get('id'))
                {
                    if (m.get('rank') === 'administrator') {
                        this.set('canRemoveUserFromGroup', true);
                    }
                }
            });
        });
        if (this.get('authSrv').get('isAdministrator'))
        {
            this.set('canRemoveUserFromGroup', true);
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
