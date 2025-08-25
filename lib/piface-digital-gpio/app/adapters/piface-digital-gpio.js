import { Promise } from 'rsvp';
import { service } from '@ember/service';
import Adapter from '@ember-data/adapter';

export default class PifaceDigitalGpioAdapter extends Adapter {
    @service('websocket')
    ws;

    findRecord(store, type, id) {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.read', {gpio_id: id}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll() {
        const ws = this.get('ws');
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.read', {gpio_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        const params = {
            gpio_id: snapshot.id,
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot) {
        const gpio_id = snapshot.id;
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.delete', {gpio_id: gpio_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
