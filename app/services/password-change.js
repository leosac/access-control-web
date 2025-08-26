import { defer } from 'rsvp';
import Service, { service } from '@ember/service';

/**
 * The service provide a simple API to trigger a password
 * change.
 */
export default class PasswordChangeService extends Service {
    @service('websocket')
    ws;
    @service
    flashMessages;

    changePassword(target_user_id, current_password, new_password)
    {
        const vdefer = defer();
        target_user_id = parseInt(target_user_id);

        this.ws.sendJson('password_change',
            {
                user_id: target_user_id,
                current_password: current_password,
                new_password: new_password
            }).then(() =>
        {
            vdefer.resolve();
        }, (failure) =>
        {
            this.flashMessages.danger('Failed to change password. ' + failure.status_string);
        });
        return vdefer.promise;
    }
}
