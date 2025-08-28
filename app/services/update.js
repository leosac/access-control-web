import Service, { service } from '@ember/service';
import { UpdateStatus } from 'web/leosac-constant';

/**
 * A service to interact with Leosac's Update subsystem.
 *
 * Updates do not work create with CRUD semantic. Server side
 * they can be initiated by various modules. "Deleting" and updating
 * an update doesn't really make sense, etc.
 *
 * Therefore this service is use to communicates with the various
 * update-related WS call implemented by Leosac Access Control server.
 */
export default class UpdateService extends Service {
    @service
    store;
    @service('websocket')
    ws;

    checkUpdate()
    {
        return this.ws.sendJson('check_update', {}).then((resp) =>
        {
            return resp;
        });
    }

    createUpdate(updateDescriptorUuid)
    {
        return this.ws.sendJson('create_update', {descriptor_uuid: updateDescriptorUuid}).then((resp) => {
            this.store.pushPayload(resp);
            return true;
        });
    }

    getPending()
    {
        return this.ws.sendJson('get_pending_update', {}).then((resp) =>
        {
            this.store.pushPayload(resp);
            return this.store.peekAll('access-point-update').filter(e => e.get('status') === UpdateStatus.PENDING);
        });
    }

    acknowledgeUpdate(update)
    {
        return this.ws.sendJson('ack_update',
            {update_id: update.get('numericId')}).then(() =>
        {
            return true;
        });
    }

    cancelUpdate(update)
    {
        return this.ws.sendJson('cancel_update',
            {update_id: update.get('numericId')}).then(() =>
        {
            return true;
        });
    }

    getHistory()
    {
        return this.ws.sendJson('get_update_history', {}).then((resp) =>
        {
            this.store.pushPayload(resp);
            return this.store.peekAll('access-point-update').filter(e => e.get('status') !== UpdateStatus.PENDING);
        });
    }

    getUpdate(uid)
    {
        return this.ws.sendJson('get_update', {update_id: uid}).then((resp) =>
        {
            this.store.pushPayload(resp);
            return this.store.peekRecord('access-point-update', uid);
        });
    }
}
