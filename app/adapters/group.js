import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class GroupAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('group.read', {group_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('group.read', {group_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('group.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        const params = {
            group_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('group.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const group_id = Number.parseInt(snapshot.id);

        // This is code to unload relationship object
        // on group deletion
        const model = store.peekRecord('group', group_id);
        const records = [];
        model.memberships.then((memberships) =>
        {
            memberships.toArray().forEach((r) =>
            {
                records.push(r);
            });
        });

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('group.delete', {group_id: group_id}).then(
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
}
