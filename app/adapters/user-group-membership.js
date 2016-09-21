import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),
    flashMessages: Ember.inject.service(),

    findRecord: function (store, type, id, snapshot)
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

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('user-group-membership.create', {
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
});
