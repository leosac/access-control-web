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

        // something to do with door and zones, with this you can have a link between the zones, and with the door.

        // if (data.data.relationships && data.data.relationships['door'] &&
        //     data.data.relationships['door'].data)
        //     data.data.attributes.doors_id = Number.parseInt(data.data.relationships['door'].data.id);
        // else
        //     data.data.attributes.doors_id = 0;

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('zone.create', {attributes: data.data.attributes}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        // something to do with door and zones, with this you can have a link between the zones, and with the door.

        // if (data.data.relationships && data.data.relationships['access-point'] &&
        //     data.data.relationships['access-point'].data)
        //     data.data.attributes.access_point_id = Number.parseInt(data.data.relationships['access-point'].data.id);
        // else
        //     data.data.attributes.access_point_id = 0;

        // const item = store.peekRecord('zone', snapshot.id);
        // const mapping = [];
        // item.get('mapping').toArray().forEach((one_mapping) => {
        //     // Embed mapping in the schedule payload.
        //     mapping.push({
        //         id: one_mapping.get('numericId'),
        //         alias: one_mapping.get('alias'),
        //         users: one_mapping.hasMany('users').ids().map(id => Number.parseInt(id)),
        //         groups: one_mapping.hasMany('groups').ids().map(id => Number.parseInt(id)),
        //         credentials: one_mapping.hasMany('credentials').ids().map(id => Number.parseInt(id)),
        //         doors: one_mapping.hasMany('doors').ids().map(id => Number.parseInt(id)),
        //     });
        // });

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