import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class UserGroupMembershipAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;
    @service
    flashMessages;

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user-group-membership.read',
                {membership_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const membershipId = Number.parseInt(snapshot.id);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user-group-membership.delete',
                {membership_id: membershipId}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        // Add the user_id and group_id to attributes, as this is
        // what the Leosac API wants.
        data.data.attributes.group_id = Number.parseInt(data.data.relationships.group.data.id);
        data.data.attributes.user_id = Number.parseInt(data.data.relationships.user.data.id);

        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('user-group-membership.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }
}
