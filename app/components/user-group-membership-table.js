import Ember from 'ember';

export default Ember.Component.extend({
    authSrv: Ember.inject.service('authentication'),
    store: Ember.inject.service(),
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
            this.set('kickOrLeave', 'Leave');
            this.set('kickOrLeaveMessage', 'Are you sure you wish to leave this group ?');
        }
        else if (this.get('authSrv').get('isAdministrator'))
        {
            this.set('kickOrLeave', 'Kick');
            this.set('kickOrLeaveMessage', 'Are you sure you wish to kick this user from the group ?');
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
