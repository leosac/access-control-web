import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    intl: service(),
    authSrv: service('authentication'),
    store: service(),
    // The user whose membership we display.
    user: false,
    // Should we display the "kick" or "leave" button.
    kickOrLeave: false,
    kickOrLeaveMessage: false,

    didReceiveAttrs()
    {
        this._super(...arguments);
        if (this.get('user').get('numericId') === this.get('authSrv').get('user_id'))
        {
            this.set('kickOrLeave', this.get('intl').t('leave'));
            this.set('kickOrLeaveMessage', this.get('intl').t('leave_group_confirmation'));
        }
        else if (this.get('authSrv').get('isAdministrator'))
        {
            this.set('kickOrLeave', this.get('intl').t('kick'));
            this.set('kickOrLeaveMessage', this.get('intl').t('kick_group_confirmation'));
        }
    },
    actions:
    {
        deleteMembership(membershipId)
        {
            const membership = this.get('store').peekRecord('user-group-membership', membershipId);
            membership.destroyRecord({});
        }
    }
});
