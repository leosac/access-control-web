import { Promise } from 'rsvp';
import { service } from '@ember/service';
import Adapter from '@ember-data/adapter';

export default class PifaceDigitalGpioAdapter extends Adapter {
    @service('websocket')
    ws;

    findRecord(store, type, id) {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('pfdigital.gpio.read', {gpio_id: id}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll() {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('pfdigital.gpio.read', {gpio_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('pfdigital.gpio.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot) {
        const data = this.serialize(snapshot);

        const params = {
            gpio_id: snapshot.id,
            attributes: data.data.attributes
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('pfdigital.gpio.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot) {
        const gpio_id = snapshot.id;

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('pfdigital.gpio.delete', {gpio_id: gpio_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
