import Ember from 'ember';

/**
 * A service to interact with Leosac's EvoXS module.
 */
export default Ember.Service.extend({
    store: Ember.inject.service(),
    websocket: Ember.inject.service('websocket'),

    checkUpdate()
    {
        return this.get('websocket').sendJson('module.evoxs.check_update', {}).then((resp) =>
        {
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

        });
    }
});
