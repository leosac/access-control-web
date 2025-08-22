import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class UserGroupMembershipTable extends Component {
    @service
    intl;

    @service('authentication')
    authSrv;

    @service
    store;

    // The user whose membership we display.
    user = false;

    // Should we display the "kick" or "leave" button.
    kickOrLeave = false;

    kickOrLeaveMessage = false;

    didReceiveAttrs() {
        super.didReceiveAttrs(...arguments);
        if (this.get('user').get('numericId') === this.authSrv.get('user_id'))
        {
            this.set('kickOrLeave', this.intl.t('leave'));
            this.set('kickOrLeaveMessage', this.intl.t('leave_group_confirmation'));
        }
        else if (this.authSrv.get('isAdministrator'))
        {
            this.set('kickOrLeave', this.intl.t('kick'));
            this.set('kickOrLeaveMessage', this.intl.t('kick_group_confirmation'));
        }
    }

    @action
    deleteMembership(membershipId) {
        const membership = this.store.peekRecord('user-group-membership', membershipId);
        membership.destroyRecord({});
    }
}
