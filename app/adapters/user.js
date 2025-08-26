import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;
    @service
    flashMessages;

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user.read', {user_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user.read', {user_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        const params = {
            user_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
