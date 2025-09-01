import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class ScheduleAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;
    @service
    flashMessages;

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('schedule.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('schedule.read',
                {schedule_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const scheduleId = Number.parseInt(snapshot.id);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('schedule.delete', {schedule_id: scheduleId}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        const item = store.peekRecord('schedule', snapshot.id);
        const mapping = [];
        item.get('mapping').slice().forEach((one_mapping) => {
            // Embed mapping in the schedule payload.
            mapping.push({
                id: one_mapping.get('numericId'),
                alias: one_mapping.get('alias'),
                users: one_mapping.hasMany('users').ids().map(id => Number.parseInt(id)),
                groups: one_mapping.hasMany('groups').ids().map(id => Number.parseInt(id)),
                credentials: one_mapping.hasMany('credentials').ids().map(id => Number.parseInt(id)),
                doors: one_mapping.hasMany('doors').ids().map(id => Number.parseInt(id)),
                zones: one_mapping.hasMany('zones').ids().map(id => Number.parseInt(id)),
            });
        });

        const params = {
            schedule_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes,
            mapping: mapping,
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('schedule.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('schedule.read',
                {schedule_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
}
