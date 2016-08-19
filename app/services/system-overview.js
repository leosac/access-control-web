import Ember from 'ember';

/**
 * This service collects system information
 * from the Leosac service.
 *
 * May need to be merged with leosac-info service. Not
 * sure what is best for now.
 */
export default Ember.Service.extend({
    websocket: Ember.inject.service('websocket'),
    instance_name: "",
    config_version: false,
    uptime: false,
    enabledModules: [],

    update()
    {
        "use strict";
        var self = this;
        var ws = self.get('websocket');
        ws.sendJson('system_overview', {}).then(
            function (response)
            {
                self.set('config_version', response.config_version);
                self.set('instance_name', response.instance_name);
                self.set('uptime', response.uptime);
                self.set('enabledModules', response.modules);
            },
            function (failure)
            {

            }
        );
    }
});
