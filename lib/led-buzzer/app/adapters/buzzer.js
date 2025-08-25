import { Promise } from 'rsvp';
import { service } from '@ember/service';
import Adapter from '@ember-data/adapter';

export default class BuzzerAdapter extends Adapter {
    @service('websocket')
    ws;

    findRecord(store, type, id) {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.read', {buzzer_id: id}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll() {
        const ws = this.get('ws');
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.read', {buzzer_id: 0}).then(
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
            ws.sendJson('buzzer.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships.gpio &&
            data.data.relationships.gpio.data) {
            data.data.attributes.gpio_id = data.data.relationships.gpio.data.id;
        }
        else
            data.data.attributes.gpio_id = 0;

        const params = {
            buzzer_id: snapshot.id,
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot) {
        const buzzer_id = snapshot.id;
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('buzzer.delete', {buzzer_id: buzzer_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
