import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class AuditEntryAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('audit.get', {}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
}
