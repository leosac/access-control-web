import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    ws: service('websocket'),

    findAll: function ()
    {
        const ws = this.get('ws');
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('audit.get', {}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
});
