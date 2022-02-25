import { defer } from 'rsvp';
import Service, { inject as service } from '@ember/service';

/**
 * The service provide a simple API to trigger a password
 * change.
 */
export default Service.extend({
    websocket: service('websocket'),
    flashMessages: service(),

    changePassword(target_user_id, current_password, new_password)
    {
        const defer = defer();
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
