import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class DoorAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('door.read', {door_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('door.read', {door_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        if (data.data.relationships && data.data.relationships['access-point'] &&
            data.data.relationships['access-point'].data) {
            data.data.attributes.access_point_id = Number.parseInt(data.data.relationships['access-point'].data.id);
        } else {
            data.data.attributes.access_point_id = 0;
        }

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('door.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

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
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('door.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const door_id = Number.parseInt(snapshot.id);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('door.delete', {door_id: door_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
