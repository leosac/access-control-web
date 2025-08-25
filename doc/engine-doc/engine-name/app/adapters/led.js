import Adapter from '@ember-data/adapter';
import { service } from '@ember/service';
import { Promise } from 'rsvp';

export default class LedAdapter extends Adapter {
    @service('websocket')
    ws;

    findRecord(store, type, id, snapshot) {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('model_name.read', {model_name_id: id}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll(store, type, sinceToken, snapshotRecordArray) {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('model_name.read', {model_name_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['gpio'] &&
            data.data.relationships['gpio'].data) {
            data.data.attributes.gpio_id = data.data.relationships['gpio'].data.id;
        }
        else
            data.data.attributes.gpio_id = 0;

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('model_name.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['gpio'] &&
            data.data.relationships['gpio'].data) {
            data.data.attributes.gpio_id = data.data.relationships['gpio'].data.id;
        }
        else
            data.data.attributes.gpio_id = 0;

        const params = {
            model_name_id: snapshot.id,
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('model_name.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot) {
        const model_name_id = snapshot.id;
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('model_name.delete', {model_name_id: model_name_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
