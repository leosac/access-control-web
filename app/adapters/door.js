import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    ws: service('websocket'),

    findRecord: function (store, type, id)
    {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('door.read', {door_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    findAll: function ()
    {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('door.read', {door_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['access-point'] &&
            data.data.relationships['access-point'].data) {
            data.data.attributes.access_point_id = Number.parseInt(data.data.relationships['access-point'].data.id);
        } else {
            data.data.attributes.access_point_id = 0;
        }

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('door.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['access-point'] &&
            data.data.relationships['access-point'].data) {
            data.data.attributes.access_point_id = Number.parseInt(data.data.relationships['access-point'].data.id);
        } else {
            data.data.attributes.access_point_id = 0;
        }

        const params = {
            door_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('door.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const door_id = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('door.delete', {door_id: door_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
