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
            ws.sendJson('group.read', {group_id: Number.parseInt(id)}).then(
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
            ws.sendJson('group.read', {group_id: 0}).then(
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
            ws.sendJson('group.create', {
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
            group_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('group.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const group_id = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        // This is code to unload relationship object
        // on group deletion
        const model = store.peekRecord('group', group_id);
        const records = [];
        model.get('memberships').then((memberships) =>
        {
            memberships.toArray().forEach((r) =>
            {
                records.push(r);
            });
        });

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('group.delete', {group_id: group_id}).then(
                (data) =>
                {
                    // Actually unload membership object.
                    records.forEach((r) =>
                    {
                        r.unloadRecord();
                    });
                    resolve(data);
                },
                (failure) => reject(failure));
        });
    }
});
