import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    findRecord: function (store, type, id)
    {
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('user-group-membership.read',
                {membership_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },
    deleteRecord: function (store, type, snapshot)
    {
        const membershipId = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('user-group-membership.delete',
                {membership_id: membershipId}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        // Add the user_id and group_id to attributes, as this is
        // what the Leosac API wants.
        data.data.attributes.group_id = Number.parseInt(data.data.relationships.group.data.id);
        data.data.attributes.user_id = Number.parseInt(data.data.relationships.user.data.id);

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('user-group-membership.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
});
