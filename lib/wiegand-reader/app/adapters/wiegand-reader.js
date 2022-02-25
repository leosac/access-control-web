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
            ws.sendJson('wiegand-reader.read', {reader_id: id}).then(
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
            ws.sendJson('wiegand-reader.read', {reader_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    createRecord: function (store, type, snapshot) {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['gpio-high'] &&
            data.data.relationships['gpio-high'].data) {
            data.data.attributes.gpio_high_id = data.data.relationships['gpio-high'].data.id;
        }
        else
            data.data.attributes.gpio_high_id = 0;

        if (data.data.relationships && data.data.relationships['buzzer'] &&
            data.data.relationships['buzzer'].data) {
            data.data.attributes.buzzer_id = data.data.relationships['buzzer'].data.id;
        }
        else
            data.data.attributes.buzzer_id = 0;

        if (data.data.relationships && data.data.relationships['green-led'] &&
            data.data.relationships['green-led'].data) {
            data.data.attributes.green_led_id = data.data.relationships['green-led'].data.id;
        }
        else
            data.data.attributes.green_led_id = 0;

        if (data.data.relationships && data.data.relationships['gpio-low'] &&
            data.data.relationships['gpio-low'].data) {
            data.data.attributes.gpio_low_id = data.data.relationships['gpio-low'].data.id;
        }
        else
            data.data.attributes.gpio_low_id = 0;

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('wiegand-reader.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships['gpio-high'] &&
            data.data.relationships['gpio-high'].data) {
            data.data.attributes.gpio_high_id = data.data.relationships['gpio-high'].data.id;
        }
        else
            data.data.attributes.gpio_high_id = 0;

        if (data.data.relationships && data.data.relationships['buzzer'] &&
            data.data.relationships['buzzer'].data) {
            data.data.attributes.buzzer_id = data.data.relationships['buzzer'].data.id;
        }
        else
            data.data.attributes.buzzer_id = 0;

        if (data.data.relationships && data.data.relationships['green-led'] &&
            data.data.relationships['green-led'].data) {
            data.data.attributes.green_led_id = data.data.relationships['green-led'].data.id;
        }
        else
            data.data.attributes.green_led_id = 0;

        if (data.data.relationships && data.data.relationships['gpio-low'] &&
            data.data.relationships['gpio-low'].data) {
            data.data.attributes.gpio_low_id = data.data.relationships['gpio-low'].data.id;
        }
        else
            data.data.attributes.gpio_low_id = 0;

        const params = {
            reader_id: snapshot.id,
            attributes: data.data.attributes
        };
        return new Promise(function (resolve, reject)
        {
            ws.sendJson('wiegand-reader.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const reader_id = snapshot.id;
        const ws = this.get('ws');

        return new Promise(function (resolve, reject)
        {
            ws.sendJson('wiegand-reader.delete', {reader_id: reader_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
});
