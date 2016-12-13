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
        return this.get('websocket').sendJson('module.evoxs.check_update', {}).then((resp) => {
            return resp;
        });
    },
    /**
     * Retrieve all known updates.
     */
    getUpdates()
    {
        return this.get('websocket').sendJson('module.evoxs.get_updates', {}).then((updates) => {
            this.get('store').pushPayload(updates);
        });
    },
    /**
     * Request an update be prepared for the AP.
     * @param ap
     */
    startUpdate(ap)
    {
        return this.get('websocket').sendJson('module.evoxs.start_update', {
            ap_id: ap.get('numericId')
        }).then((update_id) => {
            this.getUpdates();
        });
    },
    cancelUpdate(update)
    {
        return this.get('websocket').sendJson('module.evoxs.set_update_status', {
            update_id: update.get('numericId'),
            status: UpdateStatus.CANCELLED
        }).then((data) => {
            this.get('store').pushPayload(data);
        });
    },
    acknowledgeUpdate(update)
    {
        return this.get('websocket').sendJson('module.evoxs.set_update_status', {
            update_id: update.get('numericId'),
            status: UpdateStatus.ACKNOWLEDGED
        }).then((data) => {
            this.get('store').pushPayload(data);
        });
    },
    /**
     * Retrieve cylinder events.
     * @note Returns a promise.
     */
    getEvents(page, pageSize)
    {
        return this.get('websocket').sendJson('module.evoxs.get_events', {
            p: page,
            ps: pageSize
        });
    }
});
