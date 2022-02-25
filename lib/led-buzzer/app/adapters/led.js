import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default DS.Adapter.extend({
    ws: service('websocket'),

    findRecord: function (store, type, id)
    {
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('led.read', {led_id: id}).then(
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
            ws.sendJson('led.read', {led_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    createRecord: function (store, type, snapshot)
    {
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
            ws.sendJson('led.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['gpio'] &&
            data.data.relationships['gpio'].data) {
            data.data.attributes.gpio_id = data.data.relationships['gpio'].data.id;
        }
        else
            data.data.attributes.gpio_id = 0;

        const params = {
            led_id: snapshot.id,
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('led.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const led_id = snapshot.id;
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('led.delete', {led_id: led_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
