import Ember from 'ember';
import {UpdateStatus} from 'web/leosac-constant';

/**
 * A service to interact with Leosac's EvoXS module.
 */
export default Ember.Service.extend({
    store: Ember.inject.service(),
    websocket: Ember.inject.service('websocket'),

    checkUpdate()
    {
        return this.get('websocket').sendJson('check_update', {}).then((resp) => {
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
        return this.get('websocket').sendJson('get_pending_update', {}).then((resp) => {
            this.get('store').pushPayload(resp);
            return true;
        });
    },
    acknowledgeUpdate(update)
    {
        return this.get('websocket').sendJson('ack_update',
            {update_id: update.get('id')}).then((resp) => {
            return true;
        });
    },
    cancelUpdate(update)
    {
        return this.get('websocket').sendJson('cancel_update',
            {update_id: update.get('id')}).then((resp) => {
            return true;
        });
    }

});
