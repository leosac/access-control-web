import Ember from 'ember';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
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
            this.set('kickOrLeave', this.get('i18n').t('leave'));
            this.set('kickOrLeaveMessage', this.get('i18n').t('leave_group_confirmation'));
        }
        else if (this.get('authSrv').get('isAdministrator'))
        {
            this.set('kickOrLeave', this.get('i18n').t('kick'));
            this.set('kickOrLeaveMessage', this.get('i18n').t('kick_group_confirmation'));
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
