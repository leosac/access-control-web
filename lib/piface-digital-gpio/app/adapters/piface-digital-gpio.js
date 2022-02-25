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
            ws.sendJson('pfdigital.gpio.read', {gpio_id: id}).then(
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
            ws.sendJson('pfdigital.gpio.read', {gpio_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
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
    },
    deleteRecord: function (store, type, snapshot)
    {
        const gpio_id = snapshot.id;
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('pfdigital.gpio.delete', {gpio_id: gpio_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
