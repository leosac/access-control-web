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

            // We have to hardcode for EvoXS due to emberjs broken
            // polymorphic support
            return this.get('store').peekAll('evoxs-access-point-update').filter(e => e.get('status') === UpdateStatus.PENDING);
        });
    },
    acknowledgeUpdate(update)
    {
        return this.get('websocket').sendJson('ack_update',
            {update_id: update.get('numericId')}).then((resp) => {
            return true;
        });
    },
    cancelUpdate(update)
    {
        return this.get('websocket').sendJson('cancel_update',
            {update_id: update.get('numericId')}).then((resp) => {
            return true;
        });
    },
    getHistory()
    {
        return this.get('websocket').sendJson('get_update_history', {}).then((resp) => {
            this.get('store').pushPayload(resp);

            // We have to hardcode for EvoXS due to emberjs broken
            // polymorphic support
            return this.get('store').peekAll('evoxs-access-point-update').filter(e => e.get('status') !== UpdateStatus.PENDING);
        });
    }

});
