import Ember from 'ember';

/**
 * A service to interact with Leosac's EvoXS module.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),

    checkUpdate()
    {
        return this.get('websocket').sendJson('module.evoxs.check_update', {}).then((resp) =>
        {
            return resp;
        });
    }
});
