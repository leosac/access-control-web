import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('schedule.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    findRecord: function (store, type, id, snapshot)
    {
        const ws = this.get('ws');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('schedule.read',
                {schedule_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },

    deleteRecord: function (store, type, snapshot)
    {
        const scheduleId = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('schedule.delete', {schedule_id: scheduleId}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        const item = store.peekRecord('schedule', snapshot.id);
        const mapping = [];
        item.get('mapping').toArray().forEach((one_mapping) => {
            // Embed mapping in the schedule payload.
            mapping.push({
                id: one_mapping.get('numericId'),
                alias: one_mapping.get('alias'),
                users: one_mapping.hasMany('users').ids().map(id => Number.parseInt(id)),
                groups: one_mapping.hasMany('groups').ids().map(id => Number.parseInt(id)),
                credentials: one_mapping.hasMany('credentials').ids().map(id => Number.parseInt(id)),
            });
        });

        const params = {
            schedule_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes,
            mapping: mapping,
        };
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('schedule.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    findAll: function (store, type, sinceToken)
    {
        const ws = this.get('ws');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('schedule.read',
                {schedule_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
});
