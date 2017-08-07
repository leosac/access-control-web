import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
    ws: Ember.inject.service('websocket'),

    createRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        const ws = this.get('ws');

        // Retrieve owner, if any.
        if (data.data.relationships && data.data.relationships.owner && data.data.relationships.owner.data)
            data.data.attributes.owner_id = Number.parseInt(data.data.relationships.owner.data.id);
        else
            data.data.attributes.owner_id = 0;

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('credential.create', {
                'credential-type': type.modelName,
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
            ws.sendJson('credential.read',
                {credential_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    },

    deleteRecord: function (store, type, snapshot)
    {
        const credentialId = Number.parseInt(snapshot.id);
        const ws = this.get('ws');

        // todo: Maybe add code to remove the object in the inverse side
        // of the relationship (user->credentials).

        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('credential.delete', {credential_id: credentialId}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    updateRecord: function (store, type, snapshot)
    {
        const data = this.serialize(snapshot);
        console.log(data);
        const ws = this.get('ws');

        if (data.data.relationships && data.data.relationships.owner && data.data.relationships.owner.data)
            data.data.attributes.owner_id = Number.parseInt(data.data.relationships.owner.data.id);
        else
            data.data.attributes.owner_id = 0;

        const params = {
            credential_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('credential.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    },
    findAll: function (store, type, sinceToken)
    {
        const ws = this.get('ws');
        return new Ember.RSVP.Promise(function (resolve, reject)
        {
            ws.sendJson('credential.read',
                {credential_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
});
