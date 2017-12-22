import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),

    findAll: function ()
    {
        const ws = this.get('ws');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('audit.get', {}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
});
