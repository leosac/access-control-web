import { Promise } from 'rsvp';
import { service } from '@ember/service';
import Adapter from '@ember-data/adapter';

export default class BuzzerAdapter extends Adapter {
    @service('websocket')
    ws;

    findRecord(store, type, id) {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('buzzer.read', {buzzer_id: id}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll() {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('buzzer.read', {buzzer_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);

        if (data.data.relationships && data.data.relationships['gpio'] &&
            data.data.relationships['gpio'].data) {
            data.data.attributes.gpio_id = data.data.relationships['gpio'].data.id;
        }
        else
            data.data.attributes.gpio_id = 0;

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('buzzer.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);

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
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('buzzer.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot) {
        const buzzer_id = snapshot.id;

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('buzzer.delete', {buzzer_id: buzzer_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
