import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    authSrv: service('authentication'),
    store: service(),
    router: service(),

    group: false,
    canRemoveUserFromGroup: false,
    didReceiveAttrs()
    {
        this._super(...arguments);
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
    },
    actions: {
        deleteMembership(membershipId)
        {
            const membership = this.store.peekRecord('user-group-membership', membershipId);
            membership.destroyRecord({});
        },
        gotoItem(id)
        {
            this.router.transitionTo('profile', id);
        }
    }
});
