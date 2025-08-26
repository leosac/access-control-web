import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class UserGroupMembershipTable extends Component {
    @service
    intl;

    @service('authentication')
    authSrv;

    @service
    store;

    get kickOrLeave() {
        if (this.args.user.numericId == this.authSrv.get('user_id'))
            return this.intl.t('leave');
        else if (this.authSrv.get('isAdministrator'))
            this.intl.t('kick');
        else
            return undefined;
    }

    get kickOrLeaveMessage() {
        if (this.args.user.numericId == this.authSrv.get('user_id'))
            return this.intl.t('leave_group_confirmation');
        else if (this.authSrv.get('isAdministrator'))
            this.intl.t('kick_group_confirmation');
        else
            return undefined;
    }

    @action
    deleteMembership(membershipId) {
        const membership = this.store.peekRecord('user-group-membership', membershipId);
        membership.destroyRecord({});
    }
}
