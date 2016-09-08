import Ember from 'ember';

/**
 * The service provide a simple API to trigger a password
 * change.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    changePassword(target_user_id, current_password, new_password)
    {
        const defer = Ember.RSVP.defer();
        const flashMessages = this.get('flashMessages');
        const ws = this.get('websocket');
        target_user_id = parseInt(target_user_id);

        ws.sendJson('password_change',
            {
                user_id: target_user_id,
                current_password: current_password,
                new_password: new_password
            }).then(function ()
        {
            defer.resolve();
        }, (failure)=>
        {
            flashMessages.danger('Failed to change password. ' + failure.status_string);
        });
        return defer.promise;
    }
});
