import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class ZoneAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('zone.read', {zone_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('zone.read', {zone_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        // search for each door, if none set id to null
        if (data.data.relationships && data.data.relationships['doors'] &&
            data.data.relationships['doors'].data)
        {
            data.data.attributes.doors = [];
            data.data.relationships.doors.data.forEach(function (door) {
                data.data.attributes.doors.push(Number.parseInt(door.id));
            });
        } else {
            data.data.attributes.doors = [];
        }

        // search for each zone child, if none set id to null
        if (data.data.relationships && data.data.relationships['children'] &&
            data.data.relationships['children'].data)
        {
            data.data.attributes.children = [];
            data.data.relationships.children.data.forEach(function (zones) {
                data.data.attributes.children.push(Number.parseInt(zones.id));
            });
        } else {
            data.data.attributes.children = [];
        }

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('zone.create', {
                attributes: data.data.attributes
            }).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        if (data.data.relationships && data.data.relationships['doors'] &&
            data.data.relationships['doors'].data)
        {
            data.data.attributes.doors = [];
            data.data.relationships.doors.data.forEach(function (door) {
                data.data.attributes.doors.push(Number.parseInt(door.id));
            });
        } else {
            data.data.attributes.doors = [];
        }

        // search for each child, if none set id to null
        if (data.data.relationships && data.data.relationships['children'] &&
            data.data.relationships['children'].data)
        {
            data.data.attributes.children = [];
            data.data.relationships.children.data.forEach(function (zones) {
                data.data.attributes.children.push(Number.parseInt(zones.id));
            });
        } else {
            data.data.attributes.children = [];
        }

        const params = {
            zone_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('zone.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const zone_id = Number.parseInt(snapshot.id);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('zone.delete', {zone_id: zone_id}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
