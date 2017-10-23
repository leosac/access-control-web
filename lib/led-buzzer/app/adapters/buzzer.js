import ApplicationAdapter from './application';
import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({
    ws: Ember.inject.service('websocket'),

    findRecord: function (store, type, id, snapshot)
    {
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.read', {buzzer_object_id_key: id}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    findAll: function (store, type, sinceToken, snapshotRecordArray)
    {
        const ws = this.get('ws');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.read', {buzzer_object_id_key: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        const params = {
            buzzer_object_id_key: snapshot.id,
            attributes: data.data.attributes
        };
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const buzzer_object_id_key = snapshot.id;
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.delete', {buzzer_object_id_key: buzzer_object_id_key}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
