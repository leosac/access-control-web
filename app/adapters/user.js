import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    findRecord: function (store, type, id, snapshot)
    {
        var def = Ember.RSVP.defer();
        const ws = this.get('ws');

        var p = ws.sendJson('user_get', {user_id: Number.parseInt(id)});
        const fm = this.get('flashMessages');
        p.then(function (data)
            {
                def.resolve(data);
            },
            function (failure)
            {
                def.reject(failure);
            });

        return def.promise;
    }
});
