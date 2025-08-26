import { Promise } from 'rsvp';
import { service } from '@ember/service';
import ApplicationAdapter from './application';

export default class CredentialAdapter extends ApplicationAdapter {
    @service('websocket')
    ws;

    createRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        // Find owner, if any.
        if (data.data.relationships && data.data.relationships.owner && data.data.relationships.owner.data) {
            data.data.attributes.owner_id = Number.parseInt(data.data.relationships.owner.data.id);
        } else {
            data.data.attributes.owner_id = 0;
        }
        return new Promise( (resolve, reject) =>
        {
            this.ws.sendJson('credential.create', {
                'credential-type': type.modelName,
                attributes: data.data.attributes
            }).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    findRecord(store, type, id)
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('credential.read',
                {credential_id: Number.parseInt(id)}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }

    deleteRecord(store, type, snapshot)
    {
        const credentialId = Number.parseInt(snapshot.id);

        // todo: Maybe add code to remove the object in the inverse side
        // of the relationship (user->credentials).
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('credential.delete', {credential_id: credentialId}).then(
                (data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    updateRecord(store, type, snapshot)
    {
        const data = this.serialize(snapshot);

        if (data.data.relationships && data.data.relationships.owner && data.data.relationships.owner.data) {
            data.data.attributes.owner_id = Number.parseInt(data.data.relationships.owner.data.id);
        } else {
            data.data.attributes.owner_id = 0;
        }

        const params = {
            credential_id: Number.parseInt(snapshot.id),
            attributes: data.data.attributes
        };
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('credential.update', params).then((data) => resolve(data),
                (failure) => reject(failure));
        });
    }

    findAll()
    {
        return new Promise((resolve, reject) =>
        {
            this.ws.sendJson('credential.read',
                {credential_id: 0}).then(
                (data) => resolve(data),
                (failure) => reject(failure)
            );
        });
    }
}
