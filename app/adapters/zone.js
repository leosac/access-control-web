import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),

    findRecord: function (store, type, id, snapshot)
    {
        const ws = this.get('ws');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('zone.read', {zone_id: Number.parseInt(id)}).then(
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
            ws.sendJson('zone.read', {zone_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['doors'] &&
            data.data.relationships['doors'].data)
        {
            data.data.attributes.doors = [];
            data.data.relationships.doors.data.forEach(function (door) {
                data.data.attributes.doors.push(Number.parseInt(door.id));
            });
        }
        else
            data.data.attributes.doors = 0;

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('zone.create', {
                attributes: data.data.attributes
            }).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        // something to do with door and zones, with this you can have a link between the zones, and with the door.

        data.data.attributes.doors = [];

        if (data.data.relationships && data.data.relationships['doors'] &&
            data.data.relationships['doors'].data)
        {
            data.data.relationships.doors.data.forEach(function (door) {
                data.data.attributes.doors.push(Number.parseInt(door.id));
            });
        }
        else
            data.data.attributes.doors.id = 0;

        const params = {
            zone_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('zone.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const zone_id = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('zone.delete', {zone_id: zone_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});