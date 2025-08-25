import ApplicationAdapter from '../app/adapters/application';
import { service } from '@ember/service';
import { Promise } from 'rsvp';

export default ApplicationAdapter.extend({
    ws: service('websocket'),

    findRecord: function (store, type, id)
    {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.read', {access_point_id: Number.parseInt(id)}).then(
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
            ws.sendJson('access_point.read', {access_point_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
   createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.create', {
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
            access_point_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const access_point_id = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('access_point.delete', {access_point_id: access_point_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
