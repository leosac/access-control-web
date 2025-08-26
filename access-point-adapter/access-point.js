import ApplicationAdapter from '../app/adapters/application';
import { service } from '@ember/service';
import { Promise } from 'rsvp';

export default class AccessPointAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('access_point.read', {access_point_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('access_point.read', {access_point_id: 0}).then(
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
            this.ws.sendJson('access_point.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });

    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        const params = {
            access_point_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('access_point.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const access_point_id = Number.parseInt(snapshot.id);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('access_point.delete', {access_point_id: access_point_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
