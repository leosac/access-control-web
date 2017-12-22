import Ember from 'ember';
import {UpdateStatus} from 'web/leosac-constant';

/**
 * A service to interact with Leosac's Update subsystem.
 *
 * Updates do not work create with CRUD semantic. Server side
 * they can be initiated by various modules. "Deleting" and updating
 * an update doesn't really make sense, etc.
 *
 * Therefore this service is use to communicates with the various
 * update-related WS call implemented by Leosac server.
 *
 * @note Most of the service will need to be fixed because its now geared
 * to EvoXS directly due to some broken behavior in emberjs.
 */
export default Ember.Service.extend({
    store: Ember.inject.service(),
    websocket: Ember.inject.service('websocket'),
    checkUpdate()
    {
        return this.get('websocket').sendJson('check_update', {}).then((resp) =>
        {
            return resp;
        });
    },
    createUpdate(updateDescriptorUuid)
    {
        return this.get('websocket').sendJson('create_update', {descriptor_uuid: updateDescriptorUuid}).then((resp) => {
            this.get('store').pushPayload(resp);
            return true;
        });
    },
    getPending()
    {
        return this.get('websocket').sendJson('get_pending_update', {}).then((resp) =>
        {
            this.get('store').pushPayload(resp);

            // We have to hardcode for EvoXS due to emberjs broken
            // polymorphic support
            return this.get('store').peekAll('evoxs-access-point-update').filter(e => e.get('status') === UpdateStatus.PENDING);
        });
    },
    acknowledgeUpdate(update)
    {
        return this.get('websocket').sendJson('ack_update',
            {update_id: update.get('numericId')}).then(() =>
        {
            return true;
        });
    },
    cancelUpdate(update)
    {
        return this.get('websocket').sendJson('cancel_update',
            {update_id: update.get('numericId')}).then(() =>
        {
            return true;
        });
    },
    getHistory()
    {
        return this.get('websocket').sendJson('get_update_history', {}).then((resp) =>
        {
            this.get('store').pushPayload(resp);

            // We have to hardcode for EvoXS due to emberjs broken
            // polymorphic support
            return this.get('store').peekAll('evoxs-access-point-update').filter(e => e.get('status') !== UpdateStatus.PENDING);
        });
    },
    getUpdate(uid)
    {
        return this.get('websocket').sendJson('get_update', {update_id: uid}).then((resp) =>
        {
            this.get('store').pushPayload(resp);

            // We have to hardcode for EvoXS due to emberjs broken
            // polymorphic support
            return this.get('store').peekRecord('evoxs-access-point-update', uid);
        });
    }

});
