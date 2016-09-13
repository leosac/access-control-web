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
        p.then(function (data)
            {
                def.resolve(data);
            },
            function (failure)
            {
                def.reject(failure);
            });

        return def.promise;
    },

    findAll: function(store, type, sinceToken, snapshotRecordArray)
    {
        var def = Ember.RSVP.defer();
        const ws = this.get('ws');

        var p = ws.sendJson('user_get', {user_id: 0});
        p.then(function (data)
            {
                def.resolve(data);
            },
            function (failure)
            {
                def.reject(failure);
            });

        return def.promise;
    },

    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        var def = Ember.RSVP.defer();
        const ws = this.get('ws');

        const params = {user_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes};
        var p = ws.sendJson('user_put', params);

        p.then(function (data)
            {
                console.log("RESOLVE");
                console.log(data);
                def.resolve(data);
            },
            function (failure)
            {
                console.log("UPDATE FAILURE");
                def.reject(failure);
            });

        return def.promise;
    }
});
